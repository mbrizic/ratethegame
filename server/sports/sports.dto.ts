import { GetEventDto } from "../events/events.dto";

export interface GetSportDto {
  id: number;
  name: string;
  description: string;
  events: SportEventsDto[]
}

export interface SportEventsDto {
  id: number
  name: string
}

export interface CreateSportDto {
  name: string;
  description: string;
}