import * as bcrypt from 'bcrypt';
import { CreateUserCommand, UpdateSettingCommand, UpdateUserCommand } from './users.dto';
import HttpException from '../core/exceptions/http.exception';
import { isEmptyObject } from '../core/util';
import { Users } from '../../database/models/users';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { ensureInputIsEmail, ensureLongerThan } from '../core/validation';
import { UserFactory, ValidSettingColumName } from './users.factory';
import SportsService from '../sports/sports.service';
import { UserModel } from './users.model';
import { UserSettings } from '../../database/models/user_settings';
import { EventRating } from '../../database/models/event_rating';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
import { UserSportSubscriptions } from '../../database/models/user_sport_subscriptions';
import { SportModel } from '../sports/sports.model';

class UserService {
	private entitiesToInclude = ["userSetting", "userSportSubscriptions"]

	// TODO: consider not using sports service here, but sports queries instead
	private sportsService = new SportsService()

	public async getAll(userId: number | undefined) {
		const sports = await this.sportsService.getAll(userId);
		const users = await Users.findAll({ include: this.entitiesToInclude });

		return users.map(user => this.FromDatabaseWithSports(user, sports));
	}

	public async getById(userId: number): Promise<UserModel> {
		const sports = await this.sportsService.getAll(userId);
		const user = await Users.findByPk(userId, { include: this.entitiesToInclude });
		if (!user) {
			throw new HttpException(409, "User not found.");
		}

		const model = await this.FromDatabaseWithSports(user, sports);

		return model;
	}

	private FromDatabaseWithSports(user: Users, sports: SportModel[]) {
		const userSports = sports.filter(sport => 
			user.userSportSubscriptions.some(subscription => subscription.sportId == sport.id)
		);

		return UserFactory.FromDatabase(user, userSports);
	}

	public async createUser(dto: CreateUserCommand): Promise<UserModel> {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Incorrect input data");
		}

		ensureInputIsClean(dto.email)
		ensureInputIsClean(dto.password)

		ensureInputIsEmail(dto.email)
		ensureLongerThan(dto.password, 6)

		const user = await Users.findOne({ where: { email: dto.email }, include: this.entitiesToInclude });

		if (user) {
			throw new HttpException(409, `Email ${dto.email} already taken`);
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);

		const userModel = UserFactory.Create(dto.email, hashedPassword, false)

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

	public async updateUser(userId: number, userData: UpdateUserCommand): Promise<UserModel> {
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

	public async updateUserSetting(userId: number, settingData: UpdateSettingCommand): Promise<UserModel> {
		if (isEmptyObject(settingData)) {
			throw new HttpException(400, "Incorrect input data");
		}

		const currentSettings = await UserSettings.findOne(
			{ where: { userId: userId } }
		);

		let settingUpdate = {}
		var settingColumnName : ValidSettingColumName;

		if (settingData.receiveTopRatedNotifications) {
			settingColumnName = "receiveTopRatedNotifications";
			settingUpdate = {...settingUpdate, [settingColumnName]: (!currentSettings?.receiveTopRatedNotifications)} 
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
	}
}

export default UserService;
