import { NextFunction, Request, Response } from 'express';
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
		const sports = await this.sportsService.getAll(req.user?.id)

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
		const sportId = Number(req.params.id)
		
		const sport = await this.sportsService.getById(sportId, req.user)
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
			const createdSportId = await this.sportsService.addSport(req.user.id!, dto)
			res.redirect(`sports/${createdSportId}`);
		} catch (error) {
			next(error);
		}
	}

	public addUserSportSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sportId = Number(req.params.id)

		try {
			const subscribedSportId = await this.userService.addUserSportSubscription(req.user.id!, sportId)
			res.redirect(`/sports/${subscribedSportId}`);
		} catch (error) {
			next(error);
		}
	}

	public removeUserSportSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sportId = Number(req.params.id)

		try {
			const subscribedSportId = await this.userService.removeUserSportSubscription(req.user.id!, sportId)
			res.redirect(`/sports/${subscribedSportId}`);
		} catch (error) {
			next(error);
		}
	}
}

export default SportsController;
