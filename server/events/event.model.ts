import { now } from "../core/date.service"
import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { EventRatingModel } from "./event-rating.model"

export const defaultEventRatingPercentage = 50
export const isRatedFavourablyPercentageThreshold = 50

export class EventModel implements DomainModel {

	public readonly id: number | undefined
	public readonly name: string
	public readonly date: Date
	public readonly createdByUserId: number
	public readonly sportId: number
	public readonly sportName: string
	public readonly totalRatings: number
	public readonly ratingPercentage: number
	public readonly isRatedByCurrentlyLoggedInUser: boolean

	constructor(
		eventId: number | undefined,
		name: string,
		date: Date,
		createdByUserId: number,
		currentlyLoggedInUserId: number | undefined,
		sportId: number,
		sportName: string,
		ratings: EventRatingModel[]
	) {

		this.id = eventId
		this.name = name
		this.date = date
		this.createdByUserId = createdByUserId
		this.sportId = sportId
		this.sportName = sportName

		this.ensureValid()

		this.totalRatings = ratings.length
		this.ratingPercentage = this.calculateRatingPercentage(ratings)
		this.isRatedByCurrentlyLoggedInUser = this.isRatedByUser(ratings, currentlyLoggedInUserId)
	}

	public isVotingAllowed = () =>
		this.hasEventStarted()

	public hasEventStarted = () =>
		now().getTime() > this.date.getTime()

	public isRatedFavourably = () => 
		this.ratingPercentage >= isRatedFavourablyPercentageThreshold

	public hasAnyRatings = () => 
		this.totalRatings > 0

	public ensureValid = () => {
		if (this.name.length < 3) {
			throw new ValidationException(`Event name too short.`)
		}
		if (this.sportId == null) {
			throw new ValidationException(`Event must belong to a sport.`)
		}
	}

	private calculateRatingPercentage = (votes: EventRatingModel[]) => {
		const positiveVotes = votes.filter(r => r.wouldRecommend).length
		const ratingPercentage = votes.length > 0
			? positiveVotes / votes.length * 100
			: defaultEventRatingPercentage

		return Math.round(ratingPercentage)
	}

	private isRatedByUser = (votes: EventRatingModel[], userId: number | undefined) => {
		if (userId == undefined) {
			return false
		}

		return votes.some(vote => {
			return vote.createdByUserId == userId
		})
	}

}