import { Events } from '../../database/models/events';
import { EventRating } from '../../database/models/event_rating';
import { GetEventDto } from './events.dto';
import { defaultEventRatingPercentage } from './events.service';

export function mapToDto(model: Events): GetEventDto {
	const votes = model.event_ratings
	const ratingPercentage = calculateRatingPercentage(model, votes)

	return {
		id: model.id!,
		name: model.name,
		date: model.datetime,
		ratingPercentage: ratingPercentage,
		totalRatings: votes.length,
		sportId: model.sport.id!,
		sportName: model.sport.name
	}
}

export function mapToSportDto(sportId: number, sportName: string, model: Events): GetEventDto {
	const votes = model.event_ratings
	const ratingPercentage = calculateRatingPercentage(model, votes)

	return {
		id: model.id!,
		name: model.name,
		date: model.datetime,
		ratingPercentage: ratingPercentage,
		totalRatings: votes.length,
		sportId: sportId,
		sportName: sportName
	}
}

function calculateRatingPercentage(model: Events, votes: EventRating[]) {
	const positiveVotes = votes.filter(r => r.would_recommend).length
	const ratingPercentage = model.event_ratings.length > 0
		? positiveVotes / votes.length * 100
		: defaultEventRatingPercentage;

	return ratingPercentage;
}