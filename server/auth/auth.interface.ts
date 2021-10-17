import { Request } from 'express';
import { UserDto, PotentialUser } from '../users/users.dto';

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
	user: UserDto;
	body: T;
}