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

		const ratings = event.event_ratings.map(rating =>
			new EventRatingModel(
				rating.id,
				rating.would_recommend,
				rating.created_at,
				rating.event_id,
				rating.created_by
			)
		)

		return new EventModel(
			event.id,
			event.name,
			event.datetime,
			event.created_by,
			userId,
			event.sport_id,
			sport.name,
			ratings
		)
	}

}