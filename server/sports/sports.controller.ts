import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../auth/auth.interface';
import { CreateSportDto } from './sports.dto';
import SportsService from './sports.service';

class SportsController {
	public sportsService = new SportsService();

	public getSportsList = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sports = await this.sportsService.getAll()

		try {
			res.render("sports/sports-list", {
				sports,
				user: req.user ? req.user : null
			});

		} catch (error) {
			next(error);
		}
	}

	public getSportsDetails = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const sportId = Number(req.params.id)
		
		const sport = await this.sportsService.getById(sportId)

		try {
			res.render("sports/sports-details", {
				sport,
				user: req.user ? req.user : null
			});

		} catch (error) {
			next(error);
		}
	}

	public addSport = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: CreateSportDto = req.body;
		
		try {
			const sport = await this.sportsService.addSport(dto)
			res.redirect(`sports/${sport.id}`);
		} catch (error) {
			next(error);
		}
	}

}

export default SportsController;
