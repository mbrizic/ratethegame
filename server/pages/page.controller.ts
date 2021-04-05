import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth.service';
import { RequestWithUser } from '../auth/auth.interface';

class PageController {
	public authService = new AuthService();

	public getIndexPage = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		try {
			res.render("index/index", {
				events: [],
				user: req.user ? req.user : null
			});

		} catch (error) {
			next(error);
		}
	}

	public getLoginPage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.render("login/login", {
				
			});

		} catch (error) {
			next(error);
		}
	}

	public login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await this.authService.login({
				email: req.body.username,
				password: req.body.password
			});

			res.setHeader('Set-Cookie', [result.cookie]);

			res.redirect("/")
		} catch (error) {
			next(error);
		}
	}
	
	public getRegisterPage = async (req: Request, res: Response, next: NextFunction) => {
		try {
			res.render("register/register", {
				
			});
		} catch (error) {
			next(error);
		}
	}

	public register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this.authService.signup({
				email: req.body.username,
				password: req.body.password
			});

			res.redirect("/login")
		} catch (error) {
			next(error);
		}
	}

	public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
	
		try {
		  await this.authService.logout(req.user);
		  res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
		  res.redirect("/login")
		} catch (error) {
		  next(error);
		}
	  }
}

export default PageController;
