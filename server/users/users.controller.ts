import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth.service';
import { UserPage } from '../../ui/page/user.page';
import { RequestWithUser } from '../auth/auth.interface';
import { CreateUserCommand, RemoveUserCommand, UpdateSettingCommand, UserDto } from './users.dto';
import { returnUrlQueryParam } from '../core/constants';
import UserService from './users.service';
import { InfoPage } from '../../ui/page/info.page';
import { ErrorPage } from '../../ui/page/error.page';
import { UserModel } from './users.model';

class UsersController {
	private authService = new AuthService();
	public userService = new UserService();

	public getUserProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		try {
			const userData = await this.userService.getById(req.user.id);

			res.send(UserPage({
				userData: userData,
				user: req.user,
			}));
		} catch (error) {
			next(error);
		}
	}

	public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId: number = Number(req.params.id);

		try {
			const userData = await this.userService.getById(userId);

			res.send(UserPage({
				userData: userData,
				user: req.user,
			}));
		} catch (error) {
			next(error);
		}
	}

	public createUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userData: CreateUserCommand = req.body;

		try {
			const createUserData = await this.userService.createUser(userData);
			res.status(201).json({ data: createUserData, message: 'created' });
		} catch (error) {
			next(error);
		}
	}

	public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId: number = Number(req.params.id);

		try {
			const updated = await this.userService.updateUser(userId, req.user);
			res.status(200).json({ data: updated, message: 'updated' });
		} catch (error) {
			next(error);
		}
	}

	public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId: number = Number(req.user.id);
		const userData: RemoveUserCommand = req.body;
		var user;

		try {
			user = await this.authService.authenticate({ email: req.user.email, password: userData.password })

		} catch {
			const userData = await this.userService.getById(userId);

			res.send(UserPage({
				userData: userData,
				user: req.user,
				errorMessage: "Incorrect password.",
			}));
			
			return
		}

		try {
			await this.authService.logout(req.user);
			await this.userService.deleteUser(userId);

			res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
			res.redirect("/")
		} catch (error) {
			next(error);
		}
	}

	public updateUserSetting = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId: number = Number(req.params.id);
		const settingData: UpdateSettingCommand = req.body;

		try {
			const updated = await this.userService.updateUserSetting(userId, settingData);
			res.redirect(`/profile`)
		} catch (error) {
			next(error);
		}
	}

	public unsubscribeUser = async (req: Request, res: Response, next: NextFunction) => {
		const receivedUnsubscribeToken = req.params.u;

		try {
			const userData = await this.userService.getByUnsubscribeToken(receivedUnsubscribeToken);
			if (userData.unsubscribeToken == receivedUnsubscribeToken) {
				await this.userService.unsubscribeUser(userData);
				
				res.send(InfoPage({
					user: undefined,
					infoMessage: `User ${userData.email} unsubscribed. You will no longer receive emails from this site.`
				}))
			}

			res.send(ErrorPage({
				user: undefined,
				errorMessage: "Wrong user data."
			}))
		} catch (error) {
			next(error);
		}
	}
}

export default UsersController;
