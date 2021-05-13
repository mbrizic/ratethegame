import { Router } from 'express';
import AuthController from './auth.controller';
import Route from '../core/route.interface';
import validationMiddleware from '../core/middleware/validation.middleware';
import { authMiddleware, ensureAuthenticated } from '../core/middleware/auth.middleware';
import { LoginUserDto, RegisterUserDto } from './auth.dto';

class AuthRoute implements Route {
	public path = '/auth';
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}/signup`, validationMiddleware(RegisterUserDto), this.authController.register);
		this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto), this.authController.logIn);
		this.router.post(`${this.path}/logout`, authMiddleware, ensureAuthenticated, this.authController.logOut);
	}
}

export default AuthRoute;
