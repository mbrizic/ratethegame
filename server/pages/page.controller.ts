import { NextFunction, Request, Response } from 'express';
import AuthService from '../auth/auth.service';
import { RequestWithPotentialUser, RequestWithUser } from '../auth/auth.interface';
import EventsService from '../events/events.service';
import { IndexPage } from '../../ui/page/index.page';
import SportsService from '../sports/sports.service';
import { LoginPage } from '../../ui/page/login.page';
import { RegisterPage } from '../../ui/page/register.page';

export default class PageController {
	private authService = new AuthService();
	private eventsService = new EventsService();
	private sportsService = new SportsService();

	public getIndexPage = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const bestRatedEvents = await this.eventsService.getBestRated();
		const upcomingEvents = await this.eventsService.getUpcoming();
		const sports = await this.sportsService.getAll();

		try {
			res.send(
				IndexPage({
					user: req.user,
					bestRatedEvents,
					upcomingEvents,
					sports
				})
			)	
		} catch (error) {
			next(error)
		}
	}

	public getLoginPage = async (req: Request, res: Response, next: NextFunction) => {
		res.send(
			LoginPage({
				user: null
			})
		);
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

			res.send(LoginPage({
				user: null,
				errorMessage: "Oops, login not successful."
			}))
		}
	}
	
	public getRegisterPage = async (req: Request, res: Response, next: NextFunction) => {
		res.send(
			RegisterPage({
				user: null
			})
		);
	}

	public register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this.authService.signup({
				email: req.body.username,
				password: req.body.password
			});

			res.redirect("/login")
		} catch (error) {
			res.send(RegisterPage({
				user: null,
				errorMessage: error.message
			}))
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