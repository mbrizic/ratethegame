import { NextFunction, Response } from 'express';
import { EventDetailsPage } from '../../ui/page/event-details.page';
import { EventListPage } from '../../ui/page/event-list.page';
import { RequestWithPotentialUser, RequestWithUser } from '../auth/auth.interface';
import { CreateEventCommand, RateEventCommand } from './events.dto';
import EventsService from './events.service';

class EventsController {
	public eventsService = new EventsService();

	public getEventsList = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const eventsFromThisWeek = await this.eventsService.getStartedEventsFromThisWeek();
		const bestRatedEvents = await this.eventsService.getBestRated();
		const upcomingEvents = await this.eventsService.getUpcoming();

		try {
			res.send(EventListPage({
				bestRatedEvents,
				upcomingEvents,
				eventsFromThisWeek,
				user: req.user ? req.user : null
			}));

		} catch (error) {
			next(error);
		}
	}

	public getEventsDetails = async (req: RequestWithPotentialUser, res: Response, next: NextFunction) => {
		const eventSlug = req.params.slug
		
		try {
			const event = await this.eventsService.getBySlug(eventSlug)

			res.send(EventDetailsPage({
				event,
				user: req.user
			}));
		} catch (error) {
			next(error);
		}
	}

	public addEvent = async (req: RequestWithUser<CreateEventCommand>, res: Response, next: NextFunction) => {
		const dto = req.body;

		try {
			const createdEventSlug = await this.eventsService.addEvent(req.user, dto)
			res.redirect(`/events/${createdEventSlug}`);
		} catch (error) {
			next(error);
		}
	}

	public addVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventCommand = req.body;

		try {
			await this.eventsService.addRating(req.user.id, dto)
			res.redirect(`/events/${dto.eventSlug}`);
		} catch (error) {
			next(error);
		}
	}
	
	public removeVote = async (req: RequestWithUser, res: Response, next: NextFunction) => {
		const dto: RateEventCommand = req.body;
		
		try {
			await this.eventsService.removeRating(req.user.id, dto)
			res.redirect(`/events/${dto.eventSlug}`);
		} catch (error) {
			next(error);
		}
	}

}

export default EventsController;
