import { Events } from "../../database/models/init-models"
import { Sports } from "../../database/models/sports"
import ValidationException from "../core/exceptions/validation.exception"
import { createSlug } from "../core/slug.service"
import { EventFactory } from "../events/events.factory"
import { SportModel } from "./sports.model"

export class SportFactory {

	public static Create(name: string, description: string, userId: number) {
		return new SportModel(
			undefined,
			name,
			createSlug(name),
			description,
			userId,
			[]
		)
	}

	public static FromDatabase(sport: Sports, events: Events[]) {
		if (sport == null) {
			throw new ValidationException("No sport with that ID")
		}

		const eventModels = events.map(event =>
			EventFactory.FromDatabase(event, sport)
		)

		return new SportModel(
			sport.id,
			sport.name,
			sport.slug,
			sport.description,
			sport.createdBy,
			eventModels
		)
	}

}