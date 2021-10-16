import { Router } from 'express';
import UserSettingsController from './user-settings.controller';
import Route from '../core/route.interface';
import { ensureAuthenticated, ensureUserAuthorized } from '../core/middleware/auth.middleware';

class UserSettingsRoute implements Route {
    public path = '/user';
    public router = Router();
    public userSettingsController = new UserSettingsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id(\\d+)`, ensureAuthenticated, ensureUserAuthorized, this.userSettingsController.getUserById);
    }
}

export default UserSettingsRoute;
