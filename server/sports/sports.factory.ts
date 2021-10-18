import { Events } from "../../database/models/init-models"
import { Sports } from "../../database/models/sports"
import ValidationException from "../core/exceptions/validation.exception"
import { EventFactory } from "../events/events.factory"
import { SportModel } from "./sports.model"

export class SportFactory {

	public static Create(name: string, description: string, userId: number) {
		return new SportModel(
			undefined,
			name,
			description,
			userId,
			[]
		)
	}

	public static FromDatabase(sport: Sports, events: Events[], userId: number | undefined) {
		if (sport == null) {
			throw new ValidationException("No sport with that ID")
		}

		const eventModels = events.map(event =>
			EventFactory.FromDatabase(event, sport, userId)
		)

		return new SportModel(
			sport.id,
			sport.name,
			sport.description,
			sport.created_by,
			eventModels
		)
	}

}