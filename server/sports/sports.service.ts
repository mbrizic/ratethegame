import HttpException from '../core/exceptions/http.exception'
import { isEmptyObject, orderByAscending } from '../core/util'
import { Sports } from '../../database/models/sports'
import { CreateSportCommand } from './sports.dto'
import { Events } from '../../database/models/events'
import { EventRating } from '../../database/models/event_rating'
import { ensureInputIsClean } from '../core/input-sanitizer'
import ValidationException from '../core/exceptions/validation.exception'
import { SportFactory } from './sports.factory'
import { cacheSportsList, sportsCache, getCachedSportsList, sportsListCache } from './sports.cache'
import { Cacheable, InvalidatesCache } from '../core/cache.service'

const entitiesToInclude = [{
	model: Events, as: "events", include: [
		{ model: EventRating, as: "eventRatings" }
	]
}]

export default class SportsService {
	
	public async getAll() {
		const retrieved = getCachedSportsList('ALL-SPORTS')
		if (retrieved) {
			return retrieved
		}

		const results = await Sports.findAll({ include: entitiesToInclude })

		const sports = results.map(
			sport => SportFactory.FromDatabase(sport, sport.events)
		)
		
		cacheSportsList('ALL-SPORTS', sports)

		return sports
	}

	@Cacheable(sportsCache)
	public async getBySlug(slug: string) {
		const sport = await Sports.findOne({
			where: {
				slug: slug,
			},
			include: entitiesToInclude
		})

		if (sport == null) {
			throw new ValidationException("No sport with that ID")
		}

		return SportFactory.FromDatabase(sport, sport.events)
	}

	@InvalidatesCache(sportsListCache)
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
			slug: sport.slug,
			description: sport.description,
			createdBy: sport.createdByUserId,
		})

		return created.slug
	}
}
