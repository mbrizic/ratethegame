import { Router } from 'express';
import { ensureAuthenticated, readUserCredentials } from '../core/middleware/auth.middleware';
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
		this.router.get(`${this.path}`, readUserCredentials, this.controller.getEventsList);
		this.router.get(`${this.path}/:slug`, readUserCredentials, this.controller.getEventsDetails);
		
		this.router.post(`${this.path}`, ensureAuthenticated, this.controller.addEvent);
		this.router.post(`${this.path}/:slug/vote`, ensureAuthenticated, this.controller.addVote);
		this.router.post(`${this.path}/:slug/unvote`, ensureAuthenticated, this.controller.removeVote);

		// redirects after user logs in
		this.router.get(`${this.path}/:slug/vote`, ensureAuthenticated, this.controller.getEventsDetails);
	}
}

export default EventsRoute;
