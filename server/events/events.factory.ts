import { Events } from "../../database/models/init-models"
import { Sports } from "../../database/models/sports"
import ValidationException from "../core/exceptions/validation.exception"
import { createSlug } from "../core/slug.service"
import { EventRatingModel } from "./event-rating.model"
import { EventModel } from "./event.model"

export class EventFactory {

	public static Create(name: string, slug: string, date: Date, sport: Sports | null, userId: number) {

		if (sport == null || sport.id == null) {
			throw new ValidationException("Event needs to be associated with sport.")
		}

		return new EventModel(
			undefined,
			name,
			createSlug(name),
			date,
			userId,
			sport.id,
			sport.name,
			sport.slug,
			[]
		)
	}

	public static FromDatabase(
		event: Events,
		sport: Sports,
	) {
		if (event == null) {
			throw new ValidationException("No event with that ID")
		}

		const ratings = event.eventRatings.map(rating =>
			new EventRatingModel(
				rating.id,
				rating.wouldRecommend,
				rating.createdAt,
				rating.eventId,
				rating.createdBy
			)
		)

		return new EventModel(
			event.id,
			event.name,
			event.slug,
			event.datetime,
			event.createdBy,
			event.sportId,
			sport.name,
			sport.slug,
			ratings
		)
	}

}