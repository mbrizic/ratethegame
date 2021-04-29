import { Events } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import HttpException from '../core/exceptions/HttpException';
import { isEmptyObject } from '../core/util';
import { CreateEventDto, GetEventDto, RateEventDto } from './events.dto';

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

	private mapToDto(model: Events): GetEventDto {
		const votes = model.event_ratings
		const positiveVotes = votes.filter(r => r.would_recommend).length

		return {
			id: model.id,
			name: model.name,
			ratingPercentage: positiveVotes / votes.length * 100,
			totalRatings: votes.length,
			sportId: model.sport.id,
			sportName: model.sport.name
		}
	}
}

export default EventsService;
