export interface GetEventDto {
	id: number;
	name: string;
	sportName: string;
	sportId: number;
	totalRatings: number;
	ratingPercentage: number;
}

export interface CreateEventDto {
	sportId: number;
	userId: number;
	name: string;
	description: string;
}

export interface RateEventDto {
	userId: number;
	eventId: number;
	wouldRecommend: boolean;
}