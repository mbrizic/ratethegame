import { DomainModel } from "../core/domain.model"
export class EventRatingModel implements DomainModel {

	public readonly id: number | undefined
	public readonly wouldRecommend: boolean
	public readonly date: Date | undefined
	public readonly eventId: number
	public readonly createdByUserId: number

	constructor(
		id: number | undefined,
		wouldRecommend: boolean,
		date: Date | undefined,
		eventId: number,
		createdByUserId: number,
	) {
		this.id = eventId
		this.wouldRecommend = wouldRecommend
		this.date = date
		this.eventId = eventId
		this.createdByUserId = createdByUserId
	}

	public ensureValid = () => {
		
	}
}