import { Router } from 'express';
import Route from '../core/route.interface';
import { authMiddleware, ensureAdmin } from '../core/middleware/auth.middleware';
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
		this.router.post(`${this.path}/errors/clear`, authMiddleware, ensureAdmin, this.controller.clearRecordedErrors);
		this.router.post(`${this.path}/pageviews/clear`, authMiddleware, ensureAdmin, this.controller.clearPageviews);
		this.router.post(`${this.path}/css-cache/clear`, authMiddleware, ensureAdmin, this.controller.clearCssCache);
	}
}
