import { Router } from 'express';
import UsersController from './users.controller';
import Route from '../core/route.interface';
import { ensureAuthenticated, ensureIsCurrentUser } from '../core/middleware/auth.middleware';

class UsersRoute implements Route {
	public path = '/users';
	public router = Router();
	public usersController = new UsersController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`/profile`, ensureAuthenticated, this.usersController.getUserProfile);
		this.router.get(`${this.path}/:id(\\d+)`, ensureAuthenticated, ensureIsCurrentUser, this.usersController.getUserById);
		// this.router.post(`${this.path}`, ensureAdmin, this.usersController.createUser);
		// this.router.put(`${this.path}/:id(\\d+)`, ensureAdmin, this.usersController.updateUser);
		this.router.post(`${this.path}/:id(\\d+)/remove`, ensureAuthenticated, ensureIsCurrentUser, this.usersController.deleteUser);
		
		// TODO remove ids from paths
		this.router.post(`${this.path}/:id(\\d+)/setting`, ensureAuthenticated, ensureIsCurrentUser, this.usersController.updateUserSetting);
		this.router.get(`/unsubscribe/:u`, this.usersController.unsubscribeUser)
	}
}

export default UsersRoute;
