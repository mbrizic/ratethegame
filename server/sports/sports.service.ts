import HttpException from '../core/exceptions/http.exception'
import { isEmptyObject } from '../core/util'
import { Sports } from '../../database/models/sports'
import { CreateSportCommand } from './sports.dto'
import { Events } from '../../database/models/events'
import { EventRating } from '../../database/models/event_rating'
import { ensureInputIsClean } from '../core/input-sanitizer'
import { PotentialUser } from '../users/users.dto'
import { SportModel } from './sports.model'
import ValidationException from '../core/exceptions/validation.exception'
import { SportFactory } from './sports.factory'

export default class SportsService {
	private entitiesToInclude = [{
		model: Events, as: "events", include: [
			{ model: EventRating, as: "eventRatings" }
		]
	}]

	public async getAll(userId?: number): Promise<SportModel[]> {
		const sports = await Sports.findAll({ include: this.entitiesToInclude })

		return sports.map(
			sport => SportFactory.FromDatabase(sport, sport.events, userId)
		)
	}

	public async getById(id: number, user: PotentialUser) {
		const sport = await Sports.findByPk(id, { include: this.entitiesToInclude })

		if (sport == null) {
			throw new ValidationException("No sport with that ID")
		}

		return SportFactory.FromDatabase(sport, sport.events, user?.id)
	}

	public async addSport(userId: number, dto: CreateSportCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO")
		}

		ensureInputIsClean(dto.name)
		ensureInputIsClean(dto.description)

		const sport = SportFactory.Create(
			dto.name,
			dto.description,
			userId,
		)

		const created = await Sports.create({
			name: sport.name,
			description: sport.description,
			createdBy: sport.createdByUserId
		})

		return created.id
	}
}
