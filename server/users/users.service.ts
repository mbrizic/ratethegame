import * as bcrypt from 'bcrypt';
import { CreateUserCommand, UpdateUserCommand } from './users.dto';
import HttpException from '../core/exceptions/http.exception';
import { isEmptyObject } from '../core/util';
import { Users } from '../../database/models/users';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { ensureInputIsEmail, ensureLongerThan } from '../core/validation';
import { UserFactory } from './users.factory';
import SportsService from '../sports/sports.service';
import { UserModel } from './users.model';
import { UserSettings } from '../../database/models/user_settings';

class UserService {
	private entitiesToInclude = ["user_setting", "sport_subscriptions"]
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

	public async getByEmail(email: string): Promise<UserModel> {
		const user = await Users.findOne({ where: { email: email }, include: this.entitiesToInclude });
		if (!user) {
			throw new HttpException(409, `Email ${email} not found.`);
		}

		const model = UserFactory.FromDatabase(user);

		return model;
	}

	public async getByPassword(password: string): Promise<UserModel> {
		const user = await Users.findOne({ where: { password: password }, include: this.entitiesToInclude });
		if (!user) {
			throw new HttpException(409, `Password ${password} not found.`);
		}

		const model = UserFactory.FromDatabase(user);

		return model;
	}

	private async FromDatabaseWithSports(user: Users) {	
		const sports = await Promise.all(user.sport_subscriptions.map(
			async (sport_subscription) => await this.sportsService.getById(sport_subscription.sport_id, UserFactory.FromDatabase(user))
		));
		const model = UserFactory.FromDatabase(user, sports);
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
			receive_top_rated: userModel.settings.receiveTopRated,
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

	public async deleteUser(userId: number, settingsId: number) {
		const deletedSettings = await UserSettings.destroy({ where: { id: settingsId } })
		if (!deletedSettings) {
			throw new HttpException(409, "User settings not found");
		}

		const deleted = await Users.destroy({ where: { id: userId } });
		if (!deleted) {
			throw new HttpException(409, "User not found");
		}
	}
}

export default UserService;
