import { Events } from '../../database/models/events';
import { GetEventDto } from './events.dto';

export function mapToDto(model: Events): GetEventDto {
	const votes = model.event_ratings
	const positiveVotes = votes.filter(r => r.would_recommend).length

	return {
		id: model.id,
		name: model.name,
		ratingPercentage: positiveVotes / votes.length * 100,
		totalRatings: votes.length,
		sportId: model.sport.id,
		sportName: model.sport.name
	}
}

export function mapToSportDto(sportId: number, sportName: string, event: Events): GetEventDto {
	const votes = event.event_ratings
	const positiveVotes = votes.filter(r => r.would_recommend).length

	return {
		id: event.id,
		name: event.name,
		ratingPercentage: positiveVotes / votes.length * 100,
		totalRatings: votes.length,
		sportId: sportId,
		sportName: sportName
	}
}