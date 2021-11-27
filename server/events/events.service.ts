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
import { EventModel } from './event.model';
import { Sports } from '../../database/models/sports';
import { recordAnalyticsEvent } from '../core/analytics-event.service';
import eventsCache, { cacheEventsList, clearEventsCaches, getCachedEventsList } from './events.cache';
import { clearSportsCaches } from '../sports/sports.cache';

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

	public async getAllEvents() {
		const retrieved = getCachedEventsList('ALL-EVENTS')
		if (retrieved != null) {
			return retrieved
		}

		const events = await this.getAll({ include: defaultEntitiesToInclude })

		cacheEventsList('ALL-EVENTS', events)

		return events
	}

	public async getUpcoming() {
		const retrieved = getCachedEventsList('UPCOMING-EVENTS')
		if (retrieved != null) {
			return retrieved
		}

		const events = await this.getAll({
			where: {
				datetime: afterDate(now()),
			},
			include: defaultEntitiesToInclude,
			limit: defaultPageSize
		})

		cacheEventsList('UPCOMING-EVENTS', events)

		return events
	}

	public async getStartedEventsFromThisWeek() {
		const retrieved = getCachedEventsList('RECENT-EVENTS')
		if (retrieved != null) {
			return retrieved
		}

		const dateNow = now();
		const startLimit = addToDate(dateNow, { days: -7 })

		const events = await this.getAll({
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

		cacheEventsList('RECENT-EVENTS', events)

		return events
	}

	public async getBestRated() {
		const retrieved = getCachedEventsList('BEST-RATED-EVENTS')
		if (retrieved != null) {
			return retrieved
		}

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
			order: [['name', 'DESC']],
			limit: defaultPageSize
		})

		orderByDescending(events, a => a.ratingPercentage)

		cacheEventsList('BEST-RATED-EVENTS', events)

		return events;
	}

	public async getById(id: number) {
		const retrieved = eventsCache.get(id)
		if (retrieved != null) {
			return retrieved
		}

		const event = await Events.findByPk(id, { include: defaultEntitiesToInclude });

		if (event == null) {
			throw new HttpException(400, "No event with that ID");
		}

		const model = EventFactory.FromDatabase(event, event.sport);

		eventsCache.set(id, model)

		return model
	}

	public async addEvent(user: UserDto, dto: CreateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		ensureInputIsClean(dto.name)

		const sport = await Sports.findByPk(dto.sportId)

		const model = EventFactory.Create(dto.name, dto.date, sport, user.id)

		const created = await Events.create({
			name: model.name,
			sportId: model.sportId,
			createdBy: user.id,
			datetime: model.date,
		});

		clearSportsCaches(sport?.id)
		clearEventsCaches()

		return created.id
	}

	public async addRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const eventModel = await this.getById(dto.eventId)

		await EventRating.create({
			eventId: dto.eventId,
			createdBy: userId,
			wouldRecommend: dto.wouldRecommend,
		})

		clearEventsCaches(eventModel.id)
		clearSportsCaches(eventModel.sportId)

		recordAnalyticsEvent("UserVoted", userId, dto.eventId, dto.wouldRecommend.toString())

		return true
	}

	public async removeRating(userId: number, dto: RateEventCommand) {
		if (isEmptyObject(dto)) {
			throw new HttpException(400, "Invalid DTO");
		}

		const eventModel = await this.getById(dto.eventId)

		const deleted = await EventRating.destroy({
			where: {
				createdBy: userId,
				eventId: eventModel.id
			}
		});

		if (!deleted) {
			throw new HttpException(409, "Rating not found");
		}

		clearEventsCaches(eventModel.id)
		clearSportsCaches(eventModel.sportId)

		recordAnalyticsEvent("UserRemovedVote", userId, dto.eventId)

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
