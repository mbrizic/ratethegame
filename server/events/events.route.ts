import { Router } from 'express';
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
    this.router.get(`${this.path}`, this.controller.getEventsList);
    this.router.get(`${this.path}/:id(\\d+)`, this.controller.getEventsDetails);
    this.router.post(`${this.path}`, this.controller.addEvent);
    this.router.post(`${this.path}/:id(\\d+)/rating`, this.controller.rateEvent);
  }
}

export default EventsRoute;
