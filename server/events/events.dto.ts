export interface CreateEventCommand {
	sportId: number;
	name: string;
	description: string;
	slug: string;
	date: Date;
}

export interface RateEventCommand {
	eventSlug: string;
	wouldRecommend: boolean;
}