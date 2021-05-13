import { Router } from 'express';
import UIController from './page.controller';
import Route from '../core/route.interface';
import { ensureAuthenticated, readUserCredentials } from '../core/middleware/auth.middleware';

export default class PageRoute implements Route {
	public path = '/';
	public router = Router();
	public controller = new UIController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, readUserCredentials, this.controller.getIndexPage);
		
		this.router.get(`${this.path}login`, this.controller.getLoginPage);
		this.router.get(`${this.path}register`, this.controller.getRegisterPage);

		this.router.post(`${this.path}login`, this.controller.login);
		this.router.post(`${this.path}register`, this.controller.register);
		this.router.post(`${this.path}logout`, ensureAuthenticated, this.controller.logout);
	}
}
