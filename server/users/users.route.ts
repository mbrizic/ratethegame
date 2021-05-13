import { Router } from 'express';
import UsersController from './users.controller';
import Route from '../core/route.interface';
import { ensureAdmin } from '../core/middleware/auth.middleware';

class UsersRoute implements Route {
	public path = '/users';
	public router = Router();
	public usersController = new UsersController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, ensureAdmin, this.usersController.getUsers);
		this.router.get(`${this.path}/:id(\\d+)`, ensureAdmin, this.usersController.getUserById);
		this.router.post(`${this.path}`, ensureAdmin, this.usersController.createUser);
		this.router.put(`${this.path}/:id(\\d+)`, ensureAdmin, this.usersController.updateUser);
		this.router.delete(`${this.path}/:id(\\d+)`, ensureAdmin, this.usersController.deleteUser);
	}
}

export default UsersRoute;
