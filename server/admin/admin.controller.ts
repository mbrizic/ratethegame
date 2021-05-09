import { NextFunction, Response } from 'express';
import AuthService from '../auth/auth.service';
import { RequestWithPotentialUser } from '../auth/auth.interface';
import EventsService from '../events/events.service';
import { StatsPage } from '../../ui/page/stats.page';
import UserService from '../users/users.service';
import { pageViewsPerDate } from '../core/pageview.service';

export class AdminController {
	private authService = new AuthService();
	private userService = new UserService();
	private eventsService = new EventsService();

	public getStatsPage = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const events = await this.eventsService.getAllEvents();
		const users = await this.userService.getAll();
		const pageviews = pageViewsPerDate;

		try {
			res.send(
				StatsPage({
					user: req.user,
					users,
					events,
					pageviews
				})
			)	
		} catch (error) {
			next(error)
		}
	}

}

