import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../auth/auth.interface';
import { CreateUserCommand } from './users.dto';
import UserService from './users.service';

class UsersController {
	public userService = new UserService();

	public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		try {
			const findAllUsersData = await this.userService.getAll();
			res.status(200).json({ data: findAllUsersData, message: 'findAll' });
		} catch (error) {
			next(error);
		}
	}

	public getUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const userId: number = Number(req.params.id);

		try {
			const findOneUserData = await this.userService.getById(userId);
			res.status(200).json({ data: findOneUserData, message: 'findOne' });
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
		const userId: number = Number(req.params.id);

		try {
			await this.userService.deleteUser(userId);
			res.status(200).json({ message: 'deleted' });
		} catch (error) {
			next(error);
		}
	}
}

export default UsersController;
