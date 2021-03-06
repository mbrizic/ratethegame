import { NextFunction, Response } from 'express'
import AuthService from '../auth/auth.service'
import { RequestWithPotentialUser } from '../auth/auth.interface'
import EventsService from '../events/events.service'
import { AdminPage } from '../../ui/page/admin.page'
import UserService from '../users/users.service'
import { clearPageViews, getPageViewsPerDate } from '../core/pageview.service'
import { clearRecordedErrors, getRecordedErrors } from '../core/error.service'
import { clearCssCache } from '../../ui/core/css.service'
import { clearAnalyticsEvents, getAnalyticsEvents } from '../core/analytics-event.service'
import { getCacheStats, purgeAllCaches } from '../core/cache/cache.service'
import { AppSettings, getAppSettings, updateAppSettings } from '../core/app.settings'
import { clearEventsCaches } from '../events/events.cache'
import { clearSportsCaches } from '../sports/sports.cache'
import { usersCache } from '../users/users.cache'

export class AdminController {
	
	private authService = new AuthService()
	private userService = new UserService()
	private eventsService = new EventsService()

	public getStatsPage = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const events = await this.eventsService.getAllEvents()
		const numberOfPositiveVotes = await this.eventsService.getEventRatingsCount({ votedPositively: true })
		const numberOfNegativeVotes = await this.eventsService.getEventRatingsCount({ votedPositively: false })
		const totalNumberOfVotes = numberOfNegativeVotes + numberOfPositiveVotes
		const percentageOfPositiveVotes = Math.round(numberOfPositiveVotes / totalNumberOfVotes * 100)
		const users = await this.userService.getAll()
		const pageviews = getPageViewsPerDate()
		const recordedErrors = getRecordedErrors()
		const analyticsEvents = getAnalyticsEvents()
		const cacheStats = getCacheStats()
		const appSettings = getAppSettings()

		try {
			res.send(
				AdminPage({
					user: req.user,
					users,
					events,
					pageviews,
					analyticsEvents,
					recordedErrors,
					totalNumberOfVotes,
					percentageOfPositiveVotes,
					cacheStats,
					appSettings
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

	public clearAllCaches = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		purgeAllCaches()
		res.redirect("/admin")
	}

	public clearEventsCache = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearEventsCaches()
		res.redirect("/admin")
	}

	public clearSportsCache = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		clearSportsCaches()
		res.redirect("/admin")
	}

	public clearUsersCache = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		usersCache.clear()
		res.redirect("/admin")
	}

	public setAppSettings = async (req: RequestWithPotentialUser<AppSettings>, res: Response, next: NextFunction) => {
		updateAppSettings(req.body)
		res.redirect("/admin")
	}

}

