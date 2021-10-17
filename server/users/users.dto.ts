export class UserDto {
	public id: number;
	public email: string;
	public password: string;
	public isAdmin: boolean;
}

export class CreateUserDto {
	email: string;
	password: string;
}

export class UpdateUserDto {
	email: string;
	password: string;
}

export type PotentialUser = UserDto | null | undefined;