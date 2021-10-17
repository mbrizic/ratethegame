import { FindOptions } from 'sequelize/types';
import { Events, EventsAttributes } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { now } from '../core/date.service';
import HttpException from '../core/exceptions/http.exception';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { afterDate, beforeDate } from '../core/sequelize.hacks';
import { isEmptyObject, orderByDescending } from '../core/util';
import { PotentialUser, UserDto } from '../users/users.dto';
import { CreateEventDto, RateEventDto } from './events.dto';
import { EventFactory } from './events.factory';
import { EventModel } from './event.model';

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

		return EventFactory.FromDatabase(event, event.sport, user?.id);
	}

	public async addEvent(user: UserDto, dto: CreateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		ensureInputIsClean(dto.name)

		const model = EventFactory.Create(dto.name, dto.date, dto.sportId, user.id)

		const created = await Events.create({
			name: model.name,
			sport_id: model.sportId,
			created_by: user.id,
			datetime: model.date,
		});

		return created.id
	}

	public async addRating(userId: number, dto: RateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		await EventRating.create({
			event_id: dto.eventId,
			created_by: userId,
			would_recommend: dto.wouldRecommend,
		})

		return true
	}

	public async removeRating(userId: number, dto: RateEventDto) {
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

		return true
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
