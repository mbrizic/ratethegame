import { FindOptions } from 'sequelize/types';
import { Events, EventsAttributes } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { now } from '../core/date.service';
import HttpException from '../core/exceptions/HttpException';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { afterDate, beforeDate } from '../core/sequelize.hacks';
import { isEmptyObject, orderByAscending, orderByDescending } from '../core/util';
import { CreateEventDto, GetEventDto, RateEventDto } from './events.dto';
import { mapToDto } from './events.mapper';

export const defaultEventRatingPercentage = 50
const defaultPageSize = 10;

class EventsService {
	private entitiesToInclude = ["sport", "event_ratings"]

	public async getAllEvents(): Promise<GetEventDto[]> {
		return this.getAll({ })
	}

	public async getUpcoming(): Promise<GetEventDto[]> {
		return this.getAll({
			where: {
				datetime: afterDate(now())
			},
			limit: defaultPageSize
		})
	}

	public async getBestRated(): Promise<GetEventDto[]> {
		const events = await this.getAll({
			where: {
				datetime: beforeDate(now())
			},
			order: [ [ 'name', 'DESC'] ],
			limit: defaultPageSize
		})
		
		orderByDescending(events, a => a.ratingPercentage)

		return events;
	}

	public async getById(id: number) {
		const event = await Events.findByPk(id, { include: this.entitiesToInclude });

		if (event == null) {
			throw new HttpException(400, "No event with that ID");
		}

		return mapToDto(event)
	}

	public async hasUserRatedEvent(id: number, userId: number) {
		const rating = await EventRating.findOne({ where: {
			created_by: userId,
			event_id: id
		}})

		return rating != null
	}

	public async addEvent(userId: number, dto: CreateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		ensureInputIsClean(dto.name)

		const created = await Events.create({
			name: dto.name,
			sport_id: dto.sportId,
			created_by: userId,
			datetime: dto.date,
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

	private async getAll(options: FindOptions<EventsAttributes> | null = null): Promise<GetEventDto[]> {
		const events = await Events.findAll({ 
			...options,
			include: this.entitiesToInclude 
		});

		return events.map(mapToDto);
	}
}

export default EventsService;
