export interface GetEventDto {
	id: number;
	name: string;
	date: Date;
	sportName: string;
	sportId: number;
	totalRatings: number;
	ratingPercentage: number;
}

export interface CreateEventDto {
	sportId: number;
	name: string;
	description: string;
	date: Date;
}

export interface RateEventDto {
	eventId: number;
	wouldRecommend: boolean;
}