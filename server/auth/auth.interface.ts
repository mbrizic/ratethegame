import { Request } from 'express';
import { GetUserDto } from '../users/users.dto';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: GetUserDto;
}
