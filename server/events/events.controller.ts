import { NextFunction, Response } from 'express';
import { EventDetailsPage } from '../../ui/page/event-details.page';
import { EventListPage } from '../../ui/page/event-list.page';
import { RequestWithPotentialUser, RequestWithUser } from '../auth/auth.interface';
import { CreateEventDto, RateEventDto } from './events.dto';
import EventsService from './events.service';

class EventsController {
	public eventsService = new EventsService();

	public getEventsList = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const upcomingEvents = await this.eventsService.getUpcoming(req.user)
		const bestRatedEvents = await this.eventsService.getBestRated(req.user)

		try {
			res.send(EventListPage({
				upcomingEvents,
				bestRatedEvents,
				user: req.user ? req.user : null
			}));

		} catch (error) {
			next(error);
		}
	}

	public getEventsDetails = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const eventId = Number(req.params.id)
		
		try {
			const event = await this.eventsService.getById(eventId, req.user)

			res.send(EventDetailsPage({
				event,
				user: req.user
			}));
		} catch (error) {
			next(error);
		}
	}

	public addEvent = async (req: RequestWithUser<CreateEventDto>, res: Response, next: NextFunction) => {
		const dto = req.body;

		try {
			const createdEventId = await this.eventsService.addEvent(req.user, dto)
			res.redirect(`/events/${createdEventId}`);
		} catch (error) {
			next(error);
		}
	}

	public addVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventDto = req.body;

		try {
			const event = await this.eventsService.addRating(req.user.id, dto)
			res.redirect(`/events/${dto.eventId}`);
		} catch (error) {
			next(error);
		}
	}
	
	public removeVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventDto = req.body;
		
		try {
			const event = await this.eventsService.removeRating(req.user.id, dto)
			res.redirect(`/events/${dto.eventId}`);
		} catch (error) {
			next(error);
		}
	}

}

export default EventsController;
