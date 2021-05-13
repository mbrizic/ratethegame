import { Router } from 'express';
import UsersController from './users.controller';
import Route from '../core/route.interface';
import validationMiddleware from '../core/middleware/validation.middleware';
import { CreateUserDto } from './users.dto'
import { authMiddleware, ensureAdmin } from '../core/middleware/auth.middleware';

class UsersRoute implements Route {
	public path = '/users';
	public router = Router();
	public usersController = new UsersController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.usersController.getUsers);
		this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
		this.router.post(`${this.path}`, authMiddleware, ensureAdmin, validationMiddleware(CreateUserDto), this.usersController.createUser);
		this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, ensureAdmin, this.usersController.updateUser);
		this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, ensureAdmin, this.usersController.deleteUser);
	}
}

export default UsersRoute;
