import HttpException from '../core/exceptions/http.exception'
import { isEmptyObject } from '../core/util'
import { Sports } from '../../database/models/sports'
import { CreateSportCommand } from './sports.dto'
import { Events } from '../../database/models/events'
import { EventRating } from '../../database/models/event_rating'
import { ensureInputIsClean } from '../core/input-sanitizer'
import ValidationException from '../core/exceptions/validation.exception'
import { SportFactory } from './sports.factory'
import { cacheSportsList, sportsCache, getCachedSportsList } from './sports.cache'

const entitiesToInclude = [{
	model: Events, as: "events", include: [
		{ model: EventRating, as: "eventRatings" }
	]
}]

export default class SportsService {
	
	public async getAll() {
		const retrieved = getCachedSportsList('ALL-SPORTS')
		if (retrieved != null) {
			return retrieved
		}

		const results = await Sports.findAll({ include: entitiesToInclude })

		const sports = results.map(
			sport => SportFactory.FromDatabase(sport, sport.events)
		)
		
		cacheSportsList('ALL-SPORTS', sports)

		return sports
	}

	public async getById(id: number) {
		const retrieved = sportsCache.get(id)
		if (retrieved != null) {
			return retrieved
		}

		const sport = await Sports.findByPk(id, { include: entitiesToInclude })

		if (sport == null) {
			throw new ValidationException("No sport with that ID")
		}

		const model = SportFactory.FromDatabase(sport, sport.events)

		sportsCache.set(id, model)

		return model
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
