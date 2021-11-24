import type { Sequelize, Model } from "sequelize";
import { EventRating } from "./event_rating";
import type { EventRatingAttributes, EventRatingCreationAttributes } from "./event_rating";
import { Events } from "./events";
import type { EventsAttributes, EventsCreationAttributes } from "./events";
import { Log } from "./log";
import type { LogAttributes, LogCreationAttributes } from "./log";
import { Sports } from "./sports";
import type { SportsAttributes, SportsCreationAttributes } from "./sports";
import { UserSettings } from "./user_settings";
import type { UserSettingsAttributes, UserSettingsCreationAttributes } from "./user_settings";
import { UserSportSubscriptions } from "./user_sport_subscriptions";
import type { UserSportSubscriptionsAttributes, UserSportSubscriptionsCreationAttributes } from "./user_sport_subscriptions";
import { Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  EventRating,
  Events,
  Log,
  Sports,
  UserSettings,
  UserSportSubscriptions,
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
  UserSettingsAttributes,
  UserSettingsCreationAttributes,
  UserSportSubscriptionsAttributes,
  UserSportSubscriptionsCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  EventRating.initModel(sequelize);
  Events.initModel(sequelize);
  Log.initModel(sequelize);
  Sports.initModel(sequelize);
  UserSettings.initModel(sequelize);
  UserSportSubscriptions.initModel(sequelize);
  Users.initModel(sequelize);

  EventRating.belongsTo(Events, { as: "event", foreignKey: "eventId"});
  Events.hasMany(EventRating, { as: "eventRatings", foreignKey: "eventId"});
  Events.belongsTo(Sports, { as: "sport", foreignKey: "sportId"});
  Sports.hasMany(Events, { as: "events", foreignKey: "sportId"});
  UserSportSubscriptions.belongsTo(Sports, { as: "sport", foreignKey: "sportId"});
  Sports.hasMany(UserSportSubscriptions, { as: "userSportSubscriptions", foreignKey: "sportId"});
  EventRating.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy"});
  Users.hasMany(EventRating, { as: "eventRatings", foreignKey: "createdBy"});
  Events.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy"});
  Users.hasMany(Events, { as: "events", foreignKey: "createdBy"});
  Sports.belongsTo(Users, { as: "createdByUser", foreignKey: "createdBy"});
  Users.hasMany(Sports, { as: "sports", foreignKey: "createdBy"});
  UserSettings.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasOne(UserSettings, { as: "userSetting", foreignKey: "userId"});
  UserSportSubscriptions.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UserSportSubscriptions, { as: "userSportSubscriptions", foreignKey: "userId"});

  return {
    EventRating: EventRating,
    Events: Events,
    Log: Log,
    Sports: Sports,
    UserSettings: UserSettings,
    UserSportSubscriptions: UserSportSubscriptions,
    Users: Users,
  };
}
