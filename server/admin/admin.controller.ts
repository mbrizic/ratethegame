import { NextFunction, Response } from 'express';
import AuthService from '../auth/auth.service';
import { RequestWithPotentialUser } from '../auth/auth.interface';
import EventsService from '../events/events.service';
import { StatsPage } from '../../ui/page/stats.page';
import UserService from '../users/users.service';
import { clearPageViews, getPageViewsPerDate } from '../core/pageview.service';
import { clearRecordedErrors, getRecordedErrors } from '../core/error.service';
import { clearCssCache } from '../../ui/core/css.service';
import { clearAnalyticsEvents, getAnalyticsEvents } from '../core/analytics-event.service';

export class AdminController {
	
	private authService = new AuthService()
	private userService = new UserService()
	private eventsService = new EventsService()

	public getStatsPage = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const events = await this.eventsService.getAllEvents(req.user)
		const numberOfPositiveVotes = await this.eventsService.getEventRatingsCount({ votedPositively: true })
		const numberOfNegativeVotes = await this.eventsService.getEventRatingsCount({ votedPositively: false })
		const totalNumberOfVotes = numberOfNegativeVotes + numberOfPositiveVotes
		const percentageOfPositiveVotes = Math.round(numberOfPositiveVotes / totalNumberOfVotes * 100)
		console.log(totalNumberOfVotes, numberOfPositiveVotes)
		const users = await this.userService.getAll()
		const pageviews = getPageViewsPerDate()
		const recordedErrors = getRecordedErrors()
		const analyticsEvents = getAnalyticsEvents()

		try {
			res.send(
				StatsPage({
					user: req.user,
					users,
					events,
					pageviews,
					analyticsEvents,
					recordedErrors,
					totalNumberOfVotes,
					percentageOfPositiveVotes
				})
			)	
		} catch (error) {
			next(error)
		}
	}

	public clearAnalyticsEvents = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearAnalyticsEvents()
		res.redirect("/admin")
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

