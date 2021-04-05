import HttpException from '../core/exceptions/HttpException';
import { average, isEmptyObject } from '../core/util';
import { Events } from '../../models/events';
import { CreateEventDto, GetEventDto, RateEventDto } from './events.dto';
import { EventRating } from '../../models/event_rating';

class EventsService {
	private entitiesToInclude = ["sport", "event_ratings"]

	public async getAll(): Promise<GetEventDto[]> {
		const events = await Events.findAll({ include: this.entitiesToInclude });

		return events.map(this.mapToDto);
	}

	public async getById(id: number) {
		const event = await Events.findByPk(id, { include: this.entitiesToInclude });

		return this.mapToDto(event)
	}

	public async addEvent(dto: CreateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const created = await Events.create({
			name: dto.name,
			sport_id: dto.sportId
		}, { include: this.entitiesToInclude });

		return created.id
	}

	public async rateEvent(dto: RateEventDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		await EventRating.create({
			event_id: dto.eventId,
			rating: dto.rating,
		})

		return true
	}

	private mapToDto(model: Events): GetEventDto {
		const ratings = model.event_ratings ?? []

		return {
			id: model.id,
			name: model.name,
			rating: average(ratings.map(er => er.rating)),
			totalRatings: ratings.length,
			sportId: model.sport.id,
			sportName: model.sport.name
		}
	}
}

export default EventsService;
