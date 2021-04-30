import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;
}

export class LoginUserDto {
	@IsEmail()
	public email: string;

	@IsString()
	public password: string;
}

export class GetUserDto {
	public id: number;
	public email: string;
	public password: string;
}

export interface UpdateUserCommand {
	email: string;
	password: string;
}

export type PotentialUser = GetUserDto | null;