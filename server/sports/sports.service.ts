import HttpException from '../core/exceptions/HttpException'
import { isEmptyObject } from '../core/util'
import { Sports } from '../../database/models/sports'
import { CreateSportDto, GetSportDto } from './sports.dto'
import { Events } from '../../database/models/events'
import { EventRating } from '../../database/models/event_rating'
import { mapToSportDto } from '../events/events.mapper'

export class SportsService {
	private entitiesToInclude = [{
		model: Events, as: "events", include: [
			{ model: EventRating, as: "event_ratings" }
		]
	}]

	public async getAll(): Promise<GetSportDto[]> {
		const sports = await Sports.findAll({ include: this.entitiesToInclude })

		return sports.map(this.mapToDto)
	}

	public async getById(id: number) {
		const Sport = await Sports.findByPk(id, { include: this.entitiesToInclude })

		return this.mapToDto(Sport)
	}

	public async addSport(dto: CreateSportDto) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO")
		}

		const created = await Sports.create({
			name: dto.name,
			description: dto.description,
			created_by: dto.userId
		})

		return created.id
	}

	private mapToDto(model: Sports): GetSportDto {
		return {
			id: model.id,
			name: model.name,
			description: model.description,
			events: model.events.map(event =>
				mapToSportDto(model.id, model.name, event)
			)
		}
	}


}

export default SportsService
