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
		this.router.get(`${this.path}/:id(\\d+)`, readUserCredentials, this.controller.getSportsDetails)

		this.router.post(`${this.path}`, ensureAuthenticated, this.controller.addSport)
	}
}

export default SportsRoute
