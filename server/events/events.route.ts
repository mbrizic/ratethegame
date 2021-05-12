import { Router } from 'express';
import { authMiddleware, ensureAuthenticated } from '../core/middleware/auth.middleware';
import Route from '../core/route.interface';
import EventsController from './events.controller';

class EventsRoute implements Route {
	public path = '/events';
	public router = Router();
	public controller = new EventsController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, authMiddleware, this.controller.getEventsList);
		this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.controller.getEventsDetails);
		
		this.router.post(`${this.path}`, authMiddleware, ensureAuthenticated, this.controller.addEvent);
		this.router.post(`${this.path}/:id(\\d+)/vote`, authMiddleware, ensureAuthenticated, this.controller.addVote);
		this.router.post(`${this.path}/:id(\\d+)/unvote`, authMiddleware, ensureAuthenticated, this.controller.removeVote);

		// redirects after user logs in
		this.router.get(`${this.path}/:id(\\d+)/vote`, authMiddleware, ensureAuthenticated, this.controller.getEventsDetails);
	}
}

export default EventsRoute;
