import { Router } from 'express';
import UIController from './page.controller';
import Route from '../core/route.interface';
import { authMiddleware, ensureAuthenticated } from '../core/middleware/auth.middleware';

class PageRoute implements Route {
  public path = '/';
  public router = Router();
  public controller = new UIController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.controller.getIndexPage);
    // this.router.get(`${this.path}event/:id`, authMiddleware, this.controller.getMatchPage);
    this.router.get(`${this.path}login`, this.controller.getLoginPage);
    this.router.get(`${this.path}register`, this.controller.getRegisterPage);

    this.router.post(`${this.path}login`, this.controller.login);
    this.router.post(`${this.path}register`, this.controller.register);
    this.router.post(`${this.path}logout`, authMiddleware, ensureAuthenticated, this.controller.logout);
  }
}

export default PageRoute;
