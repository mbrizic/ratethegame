import { FindOptions, IncludeOptions } from 'sequelize/types';
import { Events, EventsAttributes } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { addToDate, now } from '../core/date.service';
import HttpException from '../core/exceptions/http.exception';
import { ensureInputIsClean } from '../core/input-sanitizer';
import { afterDate, and, beforeDate, notNull, between } from '../core/sequelize.hacks';
import { isEmptyObject, orderByDescending } from '../core/util';
import { UserDto } from '../users/users.dto';
import { CreateEventCommand, RateEventCommand } from './events.dto';
import { EventFactory } from './events.factory';
import { Sports } from '../../database/models/sports';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
import eventsCache, { clearEventsCaches, eventsListCache } from './events.cache';
import { clearSportsCaches } from '../sports/sports.cache';
import { Cacheable, InvalidatesCache } from '../core/cache/cache.decorator';
import ValidationException from '../core/exceptions/validation.exception';

const defaultPageSize = 10;

const sportsEntity: IncludeOptions = {
	model: Sports,
	as: "sport",
	attributes: {
		exclude: [
			"id",
			"description",
			"createdAt",
			"createdBy",
		]
	}
};

const ratingsEntity: IncludeOptions = {
	model: EventRating,
	as: "eventRatings",
	attributes: {
		exclude: [
			"id",
			"createdAt",
			"eventId"
		]
	}
};

const defaultEntitiesToInclude = [sportsEntity, ratingsEntity]
class EventsService {

	@Cacheable(eventsListCache, 'ALL-EVENTS')
	public async getAllEvents() {
		return await this.getAll({ include: defaultEntitiesToInclude })
	}

	@Cacheable(eventsListCache, 'UPCOMING-EVENTS')
	public async getUpcoming() {
		return await this.getAll({
			where: {
				datetime: afterDate(now()),
			},
			order: [[
				'datetime', 'ASC'
			]],
			include: defaultEntitiesToInclude,
			limit: defaultPageSize
		})
	}

	@Cacheable(eventsListCache, 'RECENT-EVENTS')
	public async getStartedEventsFromThisWeek() {
		const dateNow = now();
		const startLimit = addToDate(dateNow, { days: -7 })

		return await this.getAll({
			where: {
				datetime: and(
					afterDate(startLimit),
					beforeDate(dateNow),
				)
			},
			order: [[
				'datetime', 'DESC'
			]],
			include: defaultEntitiesToInclude,
			limit: defaultPageSize
		})
	}

	@Cacheable(eventsListCache, 'BEST-RATED-EVENTS')
	public async getBestRated() {
		const events = await this.getAll({
			where: {
				datetime: beforeDate(now()),
			},
			include: [
				sportsEntity,
				{
					...ratingsEntity,
					where: {
						"eventId": notNull()
					},
				}
			],
			limit: defaultPageSize
		})

		orderByDescending(events, a => a.ratingPercentage)

		return events;
	}

	@Cacheable(eventsCache)
	public async getBySlug(slug: string) {
		const event = await Events.findOne({
			where: {
				slug: slug
			},
			include: defaultEntitiesToInclude
		});

		if (event == null) {
			throw new HttpException(400, "No event with that ID");
		}

		return EventFactory.FromDatabase(event, event.sport);
	}

	@InvalidatesCache(eventsListCache)
	public async addEvent(user: UserDto, dto: CreateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		ensureInputIsClean(dto.name)

		const sport = await Sports.findByPk(dto.sportId)

		const model = EventFactory.Create(dto.name, dto.slug, dto.date, sport, user.id)

		const created = await Events.create({
			name: model.name,
			slug: model.slug,
			sportId: model.sportId,
			createdBy: user.id,
			datetime: model.date,
		});

		clearSportsCaches(sport?.slug)

		return created.slug
	}

	public async addRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const eventModel = await this.getBySlug(dto.eventSlug)

		if (eventModel.id == null) {
			throw new ValidationException("No event with such id")
		}

		await EventRating.create({
			eventId: eventModel.id,
			createdBy: userId,
			wouldRecommend: dto.wouldRecommend,
		})

		clearEventsCaches(eventModel.slug)
		clearSportsCaches(eventModel.slug)

		recordAnalyticsEvent("UserVoted", userId, eventModel.id, dto.wouldRecommend.toString())

		return true
	}

	public async removeRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const eventModel = await this.getBySlug(dto.eventSlug)

		if (eventModel.id == null) {
			throw new ValidationException("No event with such id")
		}

		const deleted = await EventRating.destroy({
			where: {
				createdBy: userId,
				eventId: eventModel.id
			}
		});

		if (!deleted) {
			throw new HttpException(409, "Rating not found");
		}

		clearEventsCaches(eventModel.slug)
		clearSportsCaches(eventModel.slug)

		recordAnalyticsEvent("UserRemovedVote", userId, eventModel.id)

		return true
	}

	public async getEventRatingsCount(options: {
		votedPositively: boolean
	}) {
		return await EventRating.count({
			where: {
				wouldRecommend: options.votedPositively
			}
		})
	}

	private async getAll(options: FindOptions<EventsAttributes> = {}) {
		const events = await Events.findAll({
			...options,
			attributes: {
				exclude: [
					"createdBy",
					"createdAt",
				]
			},
		});

		return events.map(event => EventFactory.FromDatabase(event, event.sport));
	}
}

export default EventsService;
