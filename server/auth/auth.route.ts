import { Router } from 'express';
import AuthController from './auth.controller';
import Route from '../core/route.interface';
import { ensureAuthenticated } from '../core/middleware/auth.middleware';
import { LoginUserDto, RegisterUserDto } from './auth.dto';

class AuthRoute implements Route {
	public path = '/auth';
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/signup`, this.authController.register);
		this.router.post(`${this.path}/login`, this.authController.logIn);
		this.router.post(`${this.path}/logout`, ensureAuthenticated, this.authController.logOut);
	}
}

export default AuthRoute;
