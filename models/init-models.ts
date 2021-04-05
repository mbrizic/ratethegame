import type { Sequelize, Model } from "sequelize";
import { EventRating } from "./event_rating";
import type { EventRatingAttributes, EventRatingCreationAttributes } from "./event_rating";
import { Events } from "./events";
import type { EventsAttributes, EventsCreationAttributes } from "./events";
import { Log } from "./log";
import type { LogAttributes, LogCreationAttributes } from "./log";
import { Sports } from "./sports";
import type { SportsAttributes, SportsCreationAttributes } from "./sports";
import { Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  EventRating,
  Events,
  Log,
  Sports,
  Users,
};

export type {
  EventRatingAttributes,
  EventRatingCreationAttributes,
  EventsAttributes,
  EventsCreationAttributes,
  LogAttributes,
  LogCreationAttributes,
  SportsAttributes,
  SportsCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  EventRating.initModel(sequelize);
  Events.initModel(sequelize);
  Log.initModel(sequelize);
  Sports.initModel(sequelize);
  Users.initModel(sequelize);

  EventRating.belongsTo(Events, { as: "event", foreignKey: "event_id"});
  Events.hasMany(EventRating, { as: "event_ratings", foreignKey: "event_id"});
  Events.belongsTo(Sports, { as: "sport", foreignKey: "sport_id"});
  Sports.hasMany(Events, { as: "events", foreignKey: "sport_id"});

  return {
    EventRating: EventRating,
    Events: Events,
    Log: Log,
    Sports: Sports,
    Users: Users,
  };
}
