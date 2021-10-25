import { FindOptions } from 'sequelize/types';
import { Events, EventsAttributes } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { now } from '../core/date.service';
import HttpException from '../core/exceptions/http.exception';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { afterDate, beforeDate } from '../core/sequelize.hacks';
import { isEmptyObject, orderByDescending } from '../core/util';
import { PotentialUser, UserDto } from '../users/users.dto';
import { CreateEventCommand, RateEventCommand } from './events.dto';
import { EventFactory } from './events.factory';
import { EventModel } from './event.model';
import { Sports } from '../../database/models/sports';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
import { EventRatingModel } from './event-rating.model';

const defaultPageSize = 10;

class EventsService {
	private entitiesToInclude = ["sport", "event_ratings"]

	public async getAllEvents(user: PotentialUser): Promise<EventModel[]> {
		return this.getAll(user)
	}

	public async getUpcoming(user: PotentialUser): Promise<EventModel[]> {
		return this.getAll(user, {
			where: {
				datetime: afterDate(now())
			},
			limit: defaultPageSize
		})
	}

	public async getBestRated(user: PotentialUser): Promise<EventModel[]> {
		const events = await this.getAll(user, {
			where: {
				datetime: beforeDate(now())
			},
			order: [ [ 'name', 'DESC'] ],
			limit: defaultPageSize
		})
		
		orderByDescending(events, a => a.ratingPercentage)

		return events;
	}

	public async getById(id: number, user: PotentialUser) {
		const event = await Events.findByPk(id, { include: this.entitiesToInclude });

		if (event == null) {
			throw new HttpException(400, "No event with that ID");
		}

		const model = EventFactory.FromDatabase(event, event.sport, user?.id);

		return model
	}

	public async addEvent(user: UserDto, dto: CreateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		ensureInputIsClean(dto.name)

		const sport = await Sports.findByPk(dto.sportId)

		const model = EventFactory.Create(dto.name, dto.date, sport, user.id)

		const created = await Events.create({
			name: model.name,
			sport_id: model.sportId,
			created_by: user.id,
			datetime: model.date,
		});

		return created.id
	}

	public async addRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		await EventRating.create({
			event_id: dto.eventId,
			created_by: userId,
			would_recommend: dto.wouldRecommend,
		})

		recordAnalyticsEvent("UserVoted", userId, dto.eventId, dto.wouldRecommend.toString())

		return true
	}

	public async removeRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const deleted = await EventRating.destroy({ 
			where: { 
				created_by: userId,
				event_id: dto.eventId
			}
		});

		if (!deleted) {
			throw new HttpException(409, "Rating not found");
		}

		recordAnalyticsEvent("UserRemovedVote", userId, dto.eventId)

		return true
	}

	public async getEventRatingsCount(options: {
		votedPositively: boolean
	}): Promise<number> {
		return await EventRating.count({
			where: {
				would_recommend: options.votedPositively
			}
		})
	}

	private async getAll(user: PotentialUser, options: FindOptions<EventsAttributes> | null = {}): Promise<EventModel[]> {
		const events = await Events.findAll({ 
			...options,
			include: this.entitiesToInclude 
		});

		return events.map(event => EventFactory.FromDatabase(event, event.sport, user?.id));
	}
}

export default EventsService;
