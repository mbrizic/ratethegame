import HttpException from '../core/exceptions/HttpException'
import { isEmptyObject } from '../core/util'
import { Sports } from '../../models/sports'
import { CreateSportDto, GetSportDto } from './sports.dto'

class SportsService {
	private entitiesToInclude = [ "events" ]

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
			events: model.events.map(event => ({
				id: event.id,
				name: event.name
			}))
		}
	}
}

export default SportsService
