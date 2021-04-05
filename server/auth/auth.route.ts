import { Router } from 'express';
import AuthController from './auth.controller';
import { CreateUserDto } from '../users/users.dto';
import Route from '../core/route.interface';
import authMiddleware from '../core/middleware/auth.middleware';
import validationMiddleware from '../core/middleware/validation.middleware';

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(CreateUserDto), this.authController.logIn);
    this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
