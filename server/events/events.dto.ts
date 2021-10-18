export interface CreateEventCommand {
	sportId: number;
	name: string;
	description: string;
	date: Date;
}

export interface RateEventCommand {
	eventId: number;
	wouldRecommend: boolean;
}