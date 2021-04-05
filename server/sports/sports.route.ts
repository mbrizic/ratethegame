import { Router } from 'express'
import { authMiddleware, ensureAuthenticated } from '../core/middleware/auth.middleware'
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
    this.router.get(`${this.path}`, authMiddleware, this.controller.getSportsList)
    this.router.get(`${this.path}/:id(\\d+)`, authMiddleware, this.controller.getSportsDetails)
    this.router.post(`${this.path}`, authMiddleware, ensureAuthenticated, this.controller.addSport)
  }
}

export default SportsRoute
