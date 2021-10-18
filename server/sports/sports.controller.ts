import { NextFunction, Request, Response } from 'express';
import { SportDetailsPage } from '../../ui/page/sport-details.page';
import { SportListPage } from '../../ui/page/sport-list.page';
import { RequestWithUser } from '../auth/auth.interface';
import { CreateSportCommand } from './sports.dto';
import SportsService from './sports.service';

class SportsController {
	public sportsService = new SportsService();

	public getSportsList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sports = await this.sportsService.getAll(req.user)

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

		try {
			res.send(SportDetailsPage({
				sport,
				user: req.user
			}));
		} catch (error) {
			next(error);
		}
	}

	public addSport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: CreateSportCommand = req.body;
		
		try {
			const createdSportId = await this.sportsService.addSport(req.user.id, dto)
			res.redirect(`sports/${createdSportId}`);
		} catch (error) {
			next(error);
		}
	}

}

export default SportsController;
