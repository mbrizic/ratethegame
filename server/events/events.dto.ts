export interface GetEventDto {
	id: number;
	name: string;
	sportName: string;
	sportId: number;
	totalRatings: number;
	rating: number;
}

export interface CreateEventDto {
	sportId: number;
	name: string;
	description: string;
}

export interface RateEventDto {
	eventId: number;
	rating: number;
}