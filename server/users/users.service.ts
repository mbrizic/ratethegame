import * as bcrypt from 'bcrypt';
import { CreateUserCommand, UpdateSettingCommand, UpdateUserCommand } from './users.dto';
import HttpException from '../core/exceptions/http.exception';
import { isEmptyObject } from '../core/util';
import { Users } from '../../database/models/users';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { ensureInputIsEmail, ensureLongerThan } from '../core/validation';
import { UserFactory, ValidSettingColumName } from './users.factory';
import SportsService from '../sports/sports.service';
import { UserSettings } from '../../database/models/user_settings';
import { EventRating } from '../../database/models/event_rating';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
import { UserSportSubscriptions } from '../../database/models/user_sport_subscriptions';
import { usersCache } from './users.cache';
import { Cacheable, InvalidatesCache } from '../core/cache/cache.decorator';

// TODO: consider not using sports service but rather queries instead,
// but make sure our caching still works as expected
const sportsService = new SportsService()
const entitiesToInclude = ["userSetting", "userSportSubscriptions"]

class UserService {

	public async getAll() {
		const sports = await sportsService.getAll();
		const users = await Users.findAll({ include: entitiesToInclude });

		return users.map(user => UserFactory.FromDatabase(user, sports));
	}

	@Cacheable(usersCache)
	public async getById(userId: number) {

		const sports = await sportsService.getAll();
		const user = await Users.findByPk(userId, { include: entitiesToInclude });
		if (!user) {
			throw new HttpException(409, "User not found.");
		}

		const model = UserFactory.FromDatabase(user, sports);

		return model;
	}

	public async createUser(dto: CreateUserCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Incorrect input data");
		}

		ensureInputIsClean(dto.email)
		ensureInputIsClean(dto.password)

		ensureInputIsEmail(dto.email)
		ensureLongerThan(dto.password, 6)

		const user = await Users.findOne({ where: { email: dto.email }, include: entitiesToInclude });

		if (user) {
			throw new HttpException(409, `Email ${dto.email} already taken`);
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const userModel = UserFactory.Create(dto.email, false)

		const createdUser = await Users.create({
			email: dto.email,
			password: hashedPassword,
			isAdmin: false
		});

		const createdSettings = await UserSettings.create({
			receiveTopRatedNotifications: userModel.settings.receiveTopRatedNotifications,
			userId: createdUser.id
		})

		if (!createdSettings) {
			throw new HttpException(409, "Error creating user");
		}

		return userModel;
	}

	@InvalidatesCache(usersCache)
	public async updateUser(userId: number, userData: UpdateUserCommand) {
		if (isEmptyObject(userData)) {
			throw new HttpException(400, "Incorrect input data");
		}

		const hashedPassword = await bcrypt.hash(userData.password, 10);

		const updated = await Users.update(
			{ ...userData, password: hashedPassword },
			{ where: { id: userId } }
		);

		if (!updated) {
			throw new HttpException(409, "User not found");
		}

		return await this.getById(userId)
	}

	@InvalidatesCache(usersCache)
	public async updateUserSetting(userId: number, settingData: UpdateSettingCommand) {
		if (isEmptyObject(settingData)) {
			throw new HttpException(400, "Incorrect input data");
		}

		const currentSettings = await UserSettings.findOne(
			{ where: { userId: userId } }
		);

		let settingUpdate = {}
		var settingColumnName: ValidSettingColumName;

		if (settingData.receiveTopRatedNotifications) {
			settingColumnName = "receiveTopRatedNotifications";
			settingUpdate = { ...settingUpdate, [settingColumnName]: (!currentSettings?.receiveTopRatedNotifications) }
		}

		const updated = await UserSettings.update(
			settingUpdate,
			{ where: { userId: userId } }
		);

		if (!updated) {
			throw new HttpException(409, "User settings not found");
		}

		return await this.getById(userId)
	}

	@InvalidatesCache(usersCache)
	public async deleteUser(userId: number) {
		const deletedSettings = await UserSettings.destroy({ where: { userId: userId } });
		if (!deletedSettings) {
			throw new HttpException(409, "User settings not found");
		}

		const deletedRatings = await EventRating.destroy({ where: { createdBy: userId } });
		const deletedSubscriptions = await UserSportSubscriptions.destroy({ where: { userId: userId } });

		const deleted = await Users.destroy({ where: { id: userId } });
		if (!deleted) {
			throw new HttpException(409, "User not found");
		}

		recordAnalyticsEvent("UserDeleted", userId)

		return userId
	}

	public async addUserSportSubscription(userId: number, sportSlug: string) {
		const sport = await sportsService.getBySlug(sportSlug)

		await UserSportSubscriptions.create({
			sportId: sport.id!!,
			userId: userId,
		})

		recordAnalyticsEvent("UserSubscribedToSport", userId, sport.id)

		usersCache.remove(userId)
	}

	public async removeUserSportSubscription(userId: number, sportSlug: string) {
		const sport = await sportsService.getBySlug(sportSlug)

		const deleted = await UserSportSubscriptions.destroy({
			where: {
				sportId: sport.id,
				userId: userId,
			}
		});

		if (!deleted) {
			throw new HttpException(409, "Subscription not found");
		}

		recordAnalyticsEvent("UserUnsubscribedFromSport", userId, sport.id)

		usersCache.remove(userId)
	}
}

export default UserService;
