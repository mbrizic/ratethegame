import * as bcrypt from 'bcrypt';
import { CreateUserDto, GetUserDto, UpdateUserCommand } from './users.dto';
import HttpException from '../core/exceptions/HttpException';
import { isEmptyObject } from '../core/util';
import { Users } from '../../database/models/users';

class UserService {

	public async getAll(): Promise<GetUserDto[]> {
		const users = await Users.findAll();

		return users.map(this.mapToDto);
	}

	public async getById(userId: number): Promise<GetUserDto> {
		const user = await Users.findByPk(userId);
		if (!user) {
			throw new HttpException(409, "User not found.");
		}

		return this.mapToDto(user);
	}

	public async createUser(dto: CreateUserDto): Promise<GetUserDto> {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Incorrect input data");
		}

		const user = await Users.findOne({ where: { email: dto.email } });

		if (user) {
			throw new HttpException(409, `Email ${dto.email} already taken`);
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const createdUser = await Users.create({
			email: dto.email,
			password: hashedPassword,
			is_admin: false
		});

		return this.mapToDto(createdUser);
	}

	public async updateUser(userId: number, userData: UpdateUserCommand): Promise<GetUserDto> {
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

	public async deleteUser(userId: number) {
		const deleted = await Users.destroy({ where: { id: userId } });

		if (!deleted) {
			throw new HttpException(409, "User not found");
		}
	}

	private mapToDto(model: Users): GetUserDto {
		return {
			id: model.id,
			email: model.email,
			password: model.password,
		}
	}
}

export default UserService;
