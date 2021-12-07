export interface UserDto {
	id: number;
	email: string;
	password: string;
	isAdmin: boolean;
}

export interface CreateUserCommand {
	email: string;
	password: string;
}

export interface UpdateUserCommand {
	email: string;
	password: string;
}

export interface RemoveUserCommand {
	id: number;
	password: string;
}

export type PotentialUser = UserDto | null | undefined;

export interface UpdateSettingCommand {
	receiveTopRatedNotifications: boolean;
}