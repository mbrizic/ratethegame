import { Router } from 'express';
import AuthController from './auth.controller';
import { CreateUserDto } from '../users/users.dto';
import Route from '../core/route.interface';
import validationMiddleware from '../core/middleware/validation.middleware';
import { authMiddleware, ensureAuthenticated } from '../core/middleware/auth.middleware';

class AuthRoute implements Route {
	public path = '/auth';
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
		this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
		this.router.post(`${this.path}/logout`, authMiddleware, ensureAuthenticated, this.authController.logOut);
	}
}

export default AuthRoute;
