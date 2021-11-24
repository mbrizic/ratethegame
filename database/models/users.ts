import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EventRating, EventRatingId } from './event_rating';
import type { Events, EventsId } from './events';
import type { Sports, SportsId } from './sports';
import type { UserSettings, UserSettingsCreationAttributes, UserSettingsId } from './user_settings';
import type { UserSportSubscriptions, UserSportSubscriptionsId } from './user_sport_subscriptions';

export interface UsersAttributes {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "createdAt";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  email!: string;
  password!: string;
  isAdmin!: boolean;
  createdAt!: Date;

  // Users hasMany EventRating via createdBy
  eventRatings!: EventRating[];
  getEventRatings!: Sequelize.HasManyGetAssociationsMixin<EventRating>;
  setEventRatings!: Sequelize.HasManySetAssociationsMixin<EventRating, EventRatingId>;
  addEventRating!: Sequelize.HasManyAddAssociationMixin<EventRating, EventRatingId>;
  addEventRatings!: Sequelize.HasManyAddAssociationsMixin<EventRating, EventRatingId>;
  createEventRating!: Sequelize.HasManyCreateAssociationMixin<EventRating>;
  removeEventRating!: Sequelize.HasManyRemoveAssociationMixin<EventRating, EventRatingId>;
  removeEventRatings!: Sequelize.HasManyRemoveAssociationsMixin<EventRating, EventRatingId>;
  hasEventRating!: Sequelize.HasManyHasAssociationMixin<EventRating, EventRatingId>;
  hasEventRatings!: Sequelize.HasManyHasAssociationsMixin<EventRating, EventRatingId>;
  countEventRatings!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Events via createdBy
  events!: Events[];
  getEvents!: Sequelize.HasManyGetAssociationsMixin<Events>;
  setEvents!: Sequelize.HasManySetAssociationsMixin<Events, EventsId>;
  addEvent!: Sequelize.HasManyAddAssociationMixin<Events, EventsId>;
  addEvents!: Sequelize.HasManyAddAssociationsMixin<Events, EventsId>;
  createEvent!: Sequelize.HasManyCreateAssociationMixin<Events>;
  removeEvent!: Sequelize.HasManyRemoveAssociationMixin<Events, EventsId>;
  removeEvents!: Sequelize.HasManyRemoveAssociationsMixin<Events, EventsId>;
  hasEvent!: Sequelize.HasManyHasAssociationMixin<Events, EventsId>;
  hasEvents!: Sequelize.HasManyHasAssociationsMixin<Events, EventsId>;
  countEvents!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Sports via createdBy
  sports!: Sports[];
  getSports!: Sequelize.HasManyGetAssociationsMixin<Sports>;
  setSports!: Sequelize.HasManySetAssociationsMixin<Sports, SportsId>;
  addSport!: Sequelize.HasManyAddAssociationMixin<Sports, SportsId>;
  addSports!: Sequelize.HasManyAddAssociationsMixin<Sports, SportsId>;
  createSport!: Sequelize.HasManyCreateAssociationMixin<Sports>;
  removeSport!: Sequelize.HasManyRemoveAssociationMixin<Sports, SportsId>;
  removeSports!: Sequelize.HasManyRemoveAssociationsMixin<Sports, SportsId>;
  hasSport!: Sequelize.HasManyHasAssociationMixin<Sports, SportsId>;
  hasSports!: Sequelize.HasManyHasAssociationsMixin<Sports, SportsId>;
  countSports!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasOne UserSettings via userId
  userSetting!: UserSettings;
  getUserSetting!: Sequelize.HasOneGetAssociationMixin<UserSettings>;
  setUserSetting!: Sequelize.HasOneSetAssociationMixin<UserSettings, UserSettingsId>;
  createUserSetting!: Sequelize.HasOneCreateAssociationMixin<UserSettingsCreationAttributes>;
  // Users hasMany UserSportSubscriptions via userId
  userSportSubscriptions!: UserSportSubscriptions[];
  getUserSportSubscriptions!: Sequelize.HasManyGetAssociationsMixin<UserSportSubscriptions>;
  setUserSportSubscriptions!: Sequelize.HasManySetAssociationsMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  addUserSportSubscription!: Sequelize.HasManyAddAssociationMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  addUserSportSubscriptions!: Sequelize.HasManyAddAssociationsMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  createUserSportSubscription!: Sequelize.HasManyCreateAssociationMixin<UserSportSubscriptions>;
  removeUserSportSubscription!: Sequelize.HasManyRemoveAssociationMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  removeUserSportSubscriptions!: Sequelize.HasManyRemoveAssociationsMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  hasUserSportSubscription!: Sequelize.HasManyHasAssociationMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  hasUserSportSubscriptions!: Sequelize.HasManyHasAssociationsMixin<UserSportSubscriptions, UserSportSubscriptionsId>;
  countUserSportSubscriptions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "unique_users_email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_admin'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_users_email",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Users;
  }
}
