import { Router } from 'express';
import Route from '../core/route.interface';
import { ensureAdmin } from '../core/middleware/auth.middleware';
import { AdminController } from './admin.controller';

export default class AdminRoute implements Route {
	public path = '/admin';
	public router = Router();
	public controller = new AdminController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, ensureAdmin, this.controller.getStatsPage);
		this.router.post(`${this.path}/errors/clear`, ensureAdmin, this.controller.clearRecordedErrors);
		this.router.post(`${this.path}/pageviews/clear`, ensureAdmin, this.controller.clearPageviews);
		this.router.post(`${this.path}/css-cache/clear`, ensureAdmin, this.controller.clearCssCache);
	}
}