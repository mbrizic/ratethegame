import { EventRating } from "../../database/models/event_rating"
import { now } from "../core/date.service"
import { DomainModel } from "../core/domain.model"
import ValidationException from "../core/exceptions/validation.exception"
import { createSlug } from "../core/slug.service"
import { PotentialUser } from "../users/users.dto"
import { EventRatingModel } from "./event-rating.model"

export const defaultEventRatingPercentage = 50
export const isRatedFavourablyPercentageThreshold = 50

export class EventModel implements DomainModel {

	public readonly id: number | undefined
	public readonly name: string
	public readonly slug: string
	public readonly date: Date
	public readonly createdByUserId: number
	public readonly sportId: number
	public readonly sportName: string
	public readonly sportSlug: string
	public readonly ratingPercentage: number
	public readonly ratings: EventRatingModel[]

	constructor(
		eventId: number | undefined,
		name: string,
		date: Date,
		createdByUserId: number,
		sportId: number,
		sportName: string,
		sportSlug: string,
		ratings: EventRatingModel[]
	) {

		this.id = eventId
		this.name = name
		this.date = date
		this.createdByUserId = createdByUserId
		this.sportId = sportId
		this.sportName = sportName
		this.sportSlug = sportSlug
		this.ratings = ratings

		this.ensureValid()

		this.slug = createSlug(name)
		this.ratingPercentage = this.calculateRatingPercentage(ratings)
	}

	public isVotingAllowed = () =>
		this.hasEventStarted()

	public hasEventStarted = () =>
		now().getTime() > this.date.getTime()

	public isRatedFavourably = () => 
		this.ratingPercentage >= isRatedFavourablyPercentageThreshold

	public hasAnyRatings = () => 
		this.ratings.length > 0

	public ensureValid = () => {
		if (this.name.length < 3) {
			throw new ValidationException(`Event name too short.`)
		}
		if (this.sportId == null) {
			throw new ValidationException(`Event must belong to a sport.`)
		}
	}

	public getVoteBelongingToUser = (user: PotentialUser) => {
		if (user == undefined) {
			return null
		}

		return this.ratings.find(vote => {
			return vote.createdByUserId == user.id
		})
	}

	private calculateRatingPercentage = (votes: EventRatingModel[]) => {
		const positiveVotes = votes.filter(r => r.wouldRecommend).length
		const ratingPercentage = votes.length > 0
			? positiveVotes / votes.length * 100
			: defaultEventRatingPercentage

		return Math.round(ratingPercentage)
	}

}