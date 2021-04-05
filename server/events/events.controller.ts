import { NextFunction, Response } from 'express';
import { RequestWithPotentialUser, RequestWithUser } from '../auth/auth.interface';
import { CreateEventDto, RateEventDto } from './events.dto';
import EventsService from './events.service';

class EventsController {
	public eventsService = new EventsService();

	public getEventsList = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const events = await this.eventsService.getAll()

		try {
			res.render("events/events-list", {
				events: events,
				user: req.user ? req.user : null
			});

		} catch (error) {
			next(error);
		}
	}

	public getEventsDetails = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const eventId = Number(req.params.id)
		
		const event = await this.eventsService.getById(eventId)

		const hasUserAlreadyRated = req.user
			? await this.eventsService.hasUserRatedEvent(eventId, req.user.id)
			: false

		try {
			res.render("events/events-details", {
				event,
				hasUserAlreadyRated,
				user: req.user
			});
		} catch (error) {
			next(error);
		}
	}

	public addEvent = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: CreateEventDto = req.body;
		
		try {
			const createdEventId = await this.eventsService.addEvent(dto)
			res.redirect(`/events/${createdEventId}`);
		} catch (error) {
			next(error);
		}
	}

	public addVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventDto = req.body;
		
		try {
			const event = await this.eventsService.addRating(dto)
			res.redirect(`/events/${dto.eventId}`);
		} catch (error) {
			next(error);
		}
	}
	
	public removeVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventDto = req.body;
		
		try {
			const event = await this.eventsService.removeRating(dto)
			res.redirect(`/events/${dto.eventId}`);
		} catch (error) {
			next(error);
		}
	}

}

export default EventsController;
