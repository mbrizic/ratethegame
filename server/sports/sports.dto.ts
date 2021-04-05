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
  userId: number;
}