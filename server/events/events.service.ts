import { FindOptions } from 'sequelize/types';
import { Events, EventsAttributes } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { now } from '../core/date.service';
import HttpException from '../core/exceptions/HttpException';
import { afterDate, beforeDate } from '../core/sequelize.hacks';
import { isEmptyObject, orderByAscending, orderByDescending } from '../core/util';
import { CreateEventDto, GetEventDto, RateEventDto } from './events.dto';
import { mapToDto } from './events.mapper';

class EventsService {
	private entitiesToInclude = ["sport", "event_ratings"]

	public async getUpcoming(): Promise<GetEventDto[]> {
		return this.getAll({
			where: {
				datetime: afterDate(now())
			}
		})
	}

	public async getBestRated(): Promise<GetEventDto[]> {
		const events = await this.getAll({
			where: {
				datetime: beforeDate(now())
			},
			order: [ [ 'name', 'DESC'] ]
		})
		
		orderByDescending(events, a => a.ratingPercentage)

		return events;
	}

	public async getById(id: number) {
		const event = await Events.findByPk(id, { include: this.entitiesToInclude });

		return mapToDto(event)
	}

	public async hasUserRatedEvent(id: number, userId: number) {
		const rating = await EventRating.findOne({ where: {
			created_by: userId,
			event_id: id
		}})

		return rating != null
	}

	public async addEvent(dto: CreateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const created = await Events.create({
			name: dto.name,
			sport_id: dto.sportId,
			created_by: dto.userId,
			datetime: dto.date,
		}, { include: this.entitiesToInclude });

		return created.id
	}

	public async addRating(dto: RateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		await EventRating.create({
			event_id: dto.eventId,
			created_by: dto.userId,
			would_recommend: dto.wouldRecommend,
		})

		return true
	}

	public async removeRating(dto: RateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const deleted = await EventRating.destroy({ 
			where: { 
				created_by: dto.userId,
				event_id: dto.eventId
			}
		});

		if (!deleted) {
			throw new HttpException(409, "Rating not found");
		}

		return true
	}

	private async getAll(options: FindOptions<EventsAttributes> | null = null): Promise<GetEventDto[]> {
		const events = await Events.findAll({ 
			...options,
			include: this.entitiesToInclude 
		});

		return events.map(mapToDto);
	}
}

export default EventsService;
