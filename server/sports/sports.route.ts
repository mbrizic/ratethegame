import { Router } from 'express'
import { ensureAuthenticated, readUserCredentials } from '../core/middleware/auth.middleware'
import Route from '../core/route.interface'
import SportsController from './sports.controller'

class SportsRoute implements Route {
	public path = '/sports'
	public router = Router()
	public controller = new SportsController()

	constructor() {
		this.initializeRoutes()
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, readUserCredentials, this.controller.getSportsList)
		this.router.get(`${this.path}/:slug`, readUserCredentials, this.controller.getSportsDetails)

		this.router.post(`${this.path}`, ensureAuthenticated, this.controller.addSport)
		this.router.post(`${this.path}/:slug/subscribe`, ensureAuthenticated, this.controller.addUserSportSubscription)
		this.router.post(`${this.path}/:slug/unsubscribe`, ensureAuthenticated, this.controller.removeUserSportSubscription)

		// redirects after user logs in
		this.router.get(`${this.path}/:slug/subscribe`, ensureAuthenticated, this.controller.getSportsDetails)
	}
}

export default SportsRoute
