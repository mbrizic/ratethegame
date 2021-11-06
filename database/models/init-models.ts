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

  EventRating.belongsTo(Events, { as: "event", foreignKey: "event_id"});
  Events.hasMany(EventRating, { as: "event_ratings", foreignKey: "event_id"});
  Events.belongsTo(Sports, { as: "sport", foreignKey: "sport_id"});
  Sports.hasMany(Events, { as: "events", foreignKey: "sport_id"});
  UserSportSubscriptions.belongsTo(Sports, { as: "sport", foreignKey: "sport_id"});
  Sports.hasMany(UserSportSubscriptions, { as: "user_sport_subscriptions", foreignKey: "sport_id"});
  EventRating.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by"});
  Users.hasMany(EventRating, { as: "event_ratings", foreignKey: "created_by"});
  Events.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by"});
  Users.hasMany(Events, { as: "events", foreignKey: "created_by"});
  Sports.belongsTo(Users, { as: "created_by_user", foreignKey: "created_by"});
  Users.hasMany(Sports, { as: "sports", foreignKey: "created_by"});
  UserSettings.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasOne(UserSettings, { as: "user_setting", foreignKey: "user_id"});
  UserSportSubscriptions.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(UserSportSubscriptions, { as: "user_sport_subscriptions", foreignKey: "user_id"});

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
