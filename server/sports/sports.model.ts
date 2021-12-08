import e from "express"
import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { orderByAscending, orderByDescending } from "../core/util"
import { EventModel } from "../events/event.model"

export class SportModel implements DomainModel {
	public readonly id?: number
	public readonly name: string
	public readonly createdByUserId: number
	public readonly description?: string
	public readonly events: EventModel[]

	constructor(
		id: number | undefined,
		name: string,
		description: string | undefined,
		createdByUserId: number,
		events: EventModel[],
	) {
		this.id = id
		this.name = name
		this.description = description
		this.createdByUserId = createdByUserId
		this.events = orderByAscending(events, event => event.ratingPercentage)

		this.ensureValid()
	}

	public ensureValid = () => {
		if (this.name.length < 3) {
			throw new ValidationException(`Event name too short.`)
		}
		if (this.createdByUserId == null) {
			throw new ValidationException(`Must have a createdByUserId field.`)
		}
	}

}