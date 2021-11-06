import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDto, UpdateUserCommand } from '../users/users.dto';
import HttpException from '../core/exceptions/http.exception';
import { DataStoredInToken, TokenData } from '../auth/auth.interface';
import { isEmptyObject } from '../core/util';
import UserService from '../users/users.service';
import { Users } from '../../database/models/users';
import { getAppConfig } from '../core/app.config'
import { RegisterUserCommand, LoginUserCommand } from './auth.dto';
import { ensureInputIsEmail } from '../core/validation';
import { UserModel } from '../users/users.model';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
 
class AuthService {
	private usersService = new UserService()

	public async signup(dto: RegisterUserCommand): Promise<UserModel> {
		const created = await this.usersService.createUser(dto)

		recordAnalyticsEvent("UserCreated", created.id!)

		return created
	}

	public async login(dto: LoginUserCommand): Promise<{ cookie: string, user: UserDto }> {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Incorrect input data")
		}

		const user = await this.authenticate(dto);

		const tokenData = this.createToken(user.id!);
		const cookie = this.createCookie(tokenData);

		return { cookie, user: this.mapToDto(user) };
	}

	public async authenticate(dto: LoginUserCommand) {
		ensureInputIsEmail(dto.email);

		const user = await Users.findOne({ where: { email: dto.email } })
		if (!user) {
			throw new HttpException(409, `Email ${dto.email} not found`)
		}

		const isPasswordMatching: boolean = await bcrypt.compare(dto.password, user.password)
		if (!isPasswordMatching) {
			throw new HttpException(409, "Password not matching")
		}
		return user;
	}

	public async logout(userData: UpdateUserCommand): Promise<UserModel> {
		if (isEmptyObject(userData)) {
			throw new HttpException(400, "Incorrect input data")
		}

		const user = await this.usersService.getByPassword(userData.password);
		if (!user) {
			throw new HttpException(409, "User not found")
		}

		return user;
	}

	public createToken(userId: number): TokenData {
		const dataStoredInToken: DataStoredInToken = { id: userId }

		const secret = getAppConfig().jwtSecret
		const expiresIn = 60 * 60 * 24

		return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) }
	}

	public createCookie(tokenData: TokenData): string {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`
	}

	public mapToDto(model: Users): UserDto {
		return {
			id: model.id!,
			email: model.email,
			password: model.password,
			isAdmin: model.is_admin,
		}
	}
}

export default AuthService
