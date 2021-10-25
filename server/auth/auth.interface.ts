import { Request } from 'express';
import { PotentialUser } from '../users/users.dto';
import { UserModel } from '../users/users.model';

export interface DataStoredInToken {
	id: number;
}

export interface TokenData {
	token: string;
	expiresIn: number;
}

export interface RequestWithPotentialUser<T = any> extends Request {
	user?: PotentialUser;
	body: T;
}

export interface RequestWithUser<T = any> extends Request {
	user: UserModel;
	body: T;
}