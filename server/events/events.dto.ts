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