import { Router } from 'express'
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
    this.router.get(`${this.path}`, this.controller.getSportsList)
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getSportsDetails)
    this.router.post(`${this.path}`, this.controller.addSport)
  }
}

export default SportsRoute
