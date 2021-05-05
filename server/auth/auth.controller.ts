import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../users/users.dto';
import AuthService from './auth.service';
import { RequestWithUser } from '../auth/auth.interface';

class AuthController {
	public authService = new AuthService();

	public signUp = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;

		try {
			const created = await this.authService.signup(userData);
			res.status(201).json({ data: created, message: 'signup' });
		} catch (error) {
			next(error);
		}
	}

	public logIn = async (req: Request, res: Response, next: NextFunction) => {
		const userData: CreateUserDto = req.body;

		try {
			const { cookie, user } = await this.authService.login(userData);
			res.setHeader('Set-Cookie', [cookie]);
			res.status(200).json({ data: user, message: 'login' });
		} catch (error) {
			next(error);
		}
	}

	public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		try {
			const logoutData = await this.authService.logout(req.user);
			res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
			res.status(200).json({ data: logoutData, message: 'logout' });
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
