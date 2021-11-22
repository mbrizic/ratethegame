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

class UserService {
	private entitiesToInclude = ["user_setting", "user_sport_subscriptions"]
	private sportsService = new SportsService()

	public async getAll(): Promise<UserModel[]> {
		const users = await Users.findAll({ include: this.entitiesToInclude });

		return Promise.all(users.map(user => this.FromDatabaseWithSports(user)));
	}

	public async getById(userId: number): Promise<UserModel> {
		const user = await Users.findByPk(userId, { include: this.entitiesToInclude });
		if (!user) {
			throw new HttpException(409, "User not found.");
		}

		const model = await this.FromDatabaseWithSports(user);

		return model;
	}

	private async FromDatabaseWithSports(user: Users) {
		const sports = await this.sportsService.getAll(user.id);
		const userSports = sports.filter(sport => user.user_sport_subscriptions.some(subscription => subscription.sport_id == sport.id));

		const model = UserFactory.FromDatabase(user, userSports);
		return model;
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
			email: userModel.email,
			password: userModel.password,
			is_admin: userModel.isAdmin
		});

		const createdSettings = await UserSettings.create({
			receive_top_rated_notifications: userModel.settings.receiveTopRatedNotifications,
			user_id: createdUser.id
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
			{ where: { user_id: userId } }
		);

		let settingUpdate = {}
		var settingColumnName : ValidSettingColumName;

		if (settingData.receiveTopRatedNotifications) {
			settingColumnName = "receive_top_rated_notifications";
			settingUpdate = {...settingUpdate, [settingColumnName]: (!currentSettings?.receive_top_rated_notifications)} 
		}

		const updated = await UserSettings.update(
			settingUpdate,
			{ where: { user_id: userId } }
		);

		if (!updated) {
			throw new HttpException(409, "User settings not found");
		}

		return await this.getById(userId)
	}

	public async deleteUser(userId: number) {
		const deletedSettings = await UserSettings.destroy({ where: { user_id: userId } });
		if (!deletedSettings) {
			throw new HttpException(409, "User settings not found");
		}

		const deletedRatings = await EventRating.destroy({ where: { created_by: userId } });
		const deletedSubscriptions = await UserSportSubscriptions.destroy({ where: { user_id: userId } });

		const deleted = await Users.destroy({ where: { id: userId } });
		if (!deleted) {
			throw new HttpException(409, "User not found");
		}

		recordAnalyticsEvent("UserDeleted", userId)
	}
}

export default UserService;
