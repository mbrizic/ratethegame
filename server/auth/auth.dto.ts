import { IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
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