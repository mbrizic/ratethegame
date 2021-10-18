import { NextFunction, Response } from 'express';
import AuthService from '../auth/auth.service';
import { RequestWithPotentialUser } from '../auth/auth.interface';
import EventsService from '../events/events.service';
import { StatsPage } from '../../ui/page/stats.page';
import UserService from '../users/users.service';
import { clearPageViews, getPageViewsPerDate } from '../core/pageview.service';
import { clearRecordedErrors, getRecordedErrors } from '../core/error.service';
import { clearCssCache } from '../../ui/core/css.service';

export class AdminController {
	private authService = new AuthService();
	private userService = new UserService();
	private eventsService = new EventsService();

	public getStatsPage = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const events = await this.eventsService.getAllEvents(req.user);
		const users = await this.userService.getAll();
		const pageviews = getPageViewsPerDate();
		const recordedErrors = getRecordedErrors()

		try {
			res.send(
				StatsPage({
					user: req.user,
					users,
					events,
					pageviews,
					recordedErrors
				})
			)	
		} catch (error) {
			next(error)
		}
	}

	public clearRecordedErrors = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearRecordedErrors()
		res.redirect("/admin")
	}

	public clearPageviews = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearPageViews()
		res.redirect("/admin")
	}

	public clearCssCache = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearCssCache()
		res.redirect("/admin")
	}

}

