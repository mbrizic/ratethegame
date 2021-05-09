import { Router } from 'express';
import Route from '../core/route.interface';
import { authMiddleware, ensureAdmin, ensureAuthenticated } from '../core/middleware/auth.middleware';
import { AdminController } from './admin.controller';

export default class AdminRoute implements Route {
	public path = '/admin';
	public router = Router();
	public controller = new AdminController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, ensureAdmin, this.controller.getStatsPage);
	}
}
