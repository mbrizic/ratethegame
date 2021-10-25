import { UserModel } from "./users.model";

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

export type PotentialUser = UserModel | null | undefined;