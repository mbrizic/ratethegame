export class UserDto {
	public id: number;
	public email: string;
	public password: string;
	public isAdmin: boolean;
}

export class CreateUserCommand {
	email: string;
	password: string;
}

export class UpdateUserCommand {
	email: string;
	password: string;
}

export class RemoveUserCommand {
	id: number;
	password: string;
}

export type PotentialUser = UserDto | null | undefined;