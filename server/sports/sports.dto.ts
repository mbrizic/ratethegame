import { GetEventDto } from "../events/events.dto";

export interface GetSportDto {
  id: number;
  name: string;
  description?: string;
  events: GetEventDto[]
}

export interface CreateSportDto {
  name: string;
  description: string;
  userId: number;
}