import { NextFunction, Response } from 'express';
import { SportDetailsPage } from '../../ui/page/sport-details.page';
import { SportListPage } from '../../ui/page/sport-list.page';
import { RequestWithUser } from '../auth/auth.interface';
import UserService from '../users/users.service';
import { CreateSportCommand } from './sports.dto';
import SportsService from './sports.service';

class SportsController {
	public sportsService = new SportsService();
	public userService = new UserService();

	public getSportsList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sports = await this.sportsService.getAll()

		try {
			res.send(SportListPage({
				sports,
				user: req.user
			}));

		} catch (error) {
			next(error);
		}
	}

	public getSportsDetails = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const slug = req.params.slug
		
		const sport = await this.sportsService.getBySlug(slug)
		var user;

		try {
			user = await this.userService.getById(req.user.id)
		}
		catch {
			user = undefined
		}

		try {
			res.send(SportDetailsPage({
				sport,
				user: req.user,
				userData: user, 
			}));
		} catch (error) {
			next(error);
		}
	}

	public addSport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: CreateSportCommand = req.body;
		
		try {
			const createdSportSlug = await this.sportsService.addSport(req.user.id!, dto)
			res.redirect(`sports/${createdSportSlug}`);
		} catch (error) {
			next(error);
		}
	}

	public addUserSportSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const slug = req.params.slug

		try {
			await this.userService.addUserSportSubscription(req.user.id!, slug)
			res.redirect(`/sports/${slug}`);
		} catch (error) {
			next(error);
		}
	}

	public removeUserSportSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const slug = req.params.slug

		try {
			await this.userService.removeUserSportSubscription(req.user.id!, slug)
			res.redirect(`/sports/${slug}`);
		} catch (error) {
			next(error);
		}
	}
}

export default SportsController;
