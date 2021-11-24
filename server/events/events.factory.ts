import { Events } from "../../database/models/init-models"
import { Sports } from "../../database/models/sports"
import ValidationException from "../core/exceptions/validation.exception"
import { EventRatingModel } from "./event-rating.model"
import { EventModel } from "./event.model"

export class EventFactory {

	public static Create(name: string, date: Date, sport: Sports | null, userId: number) {

		if (sport == null || sport.id == null) {
			throw new ValidationException("Event needs to be associated with sport.")
		}

		return new EventModel(
			undefined,
			name,
			date,
			userId,
			userId,
			sport.id,
			sport.name,
			[]
		)
	}

	public static FromDatabase(
		event: Events,
		sport: Sports,
		userId: number | undefined
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
			event.datetime,
			event.createdBy,
			userId,
			event.sportId,
			sport.name,
			ratings
		)
	}

}