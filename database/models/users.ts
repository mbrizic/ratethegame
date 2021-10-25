import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EventRating, EventRatingId } from './event_rating';
import type { Events, EventsId } from './events';
import type { SportSubscriptions, SportSubscriptionsId } from './sport_subscriptions';
import type { Sports, SportsId } from './sports';
import type { UserSettings, UserSettingsCreationAttributes, UserSettingsId } from './user_settings';

export interface UsersAttributes {
  id: number;
  email: string;
  password: string;
  is_admin: boolean;
  created_at: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "id" | "created_at";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: number;
  email!: string;
  password!: string;
  is_admin!: boolean;
  created_at!: Date;

  // Users hasMany EventRating via created_by
  event_ratings!: EventRating[];
  getEvent_ratings!: Sequelize.HasManyGetAssociationsMixin<EventRating>;
  setEvent_ratings!: Sequelize.HasManySetAssociationsMixin<EventRating, EventRatingId>;
  addEvent_rating!: Sequelize.HasManyAddAssociationMixin<EventRating, EventRatingId>;
  addEvent_ratings!: Sequelize.HasManyAddAssociationsMixin<EventRating, EventRatingId>;
  createEvent_rating!: Sequelize.HasManyCreateAssociationMixin<EventRating>;
  removeEvent_rating!: Sequelize.HasManyRemoveAssociationMixin<EventRating, EventRatingId>;
  removeEvent_ratings!: Sequelize.HasManyRemoveAssociationsMixin<EventRating, EventRatingId>;
  hasEvent_rating!: Sequelize.HasManyHasAssociationMixin<EventRating, EventRatingId>;
  hasEvent_ratings!: Sequelize.HasManyHasAssociationsMixin<EventRating, EventRatingId>;
  countEvent_ratings!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Events via created_by
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
  // Users hasMany SportSubscriptions via user_id
  sport_subscriptions!: SportSubscriptions[];
  getSport_subscriptions!: Sequelize.HasManyGetAssociationsMixin<SportSubscriptions>;
  setSport_subscriptions!: Sequelize.HasManySetAssociationsMixin<SportSubscriptions, SportSubscriptionsId>;
  addSport_subscription!: Sequelize.HasManyAddAssociationMixin<SportSubscriptions, SportSubscriptionsId>;
  addSport_subscriptions!: Sequelize.HasManyAddAssociationsMixin<SportSubscriptions, SportSubscriptionsId>;
  createSport_subscription!: Sequelize.HasManyCreateAssociationMixin<SportSubscriptions>;
  removeSport_subscription!: Sequelize.HasManyRemoveAssociationMixin<SportSubscriptions, SportSubscriptionsId>;
  removeSport_subscriptions!: Sequelize.HasManyRemoveAssociationsMixin<SportSubscriptions, SportSubscriptionsId>;
  hasSport_subscription!: Sequelize.HasManyHasAssociationMixin<SportSubscriptions, SportSubscriptionsId>;
  hasSport_subscriptions!: Sequelize.HasManyHasAssociationsMixin<SportSubscriptions, SportSubscriptionsId>;
  countSport_subscriptions!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Sports via created_by
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
  // Users hasOne UserSettings via user_id
  user_setting!: UserSettings;
  getUser_setting!: Sequelize.HasOneGetAssociationMixin<UserSettings>;
  setUser_setting!: Sequelize.HasOneSetAssociationMixin<UserSettings, UserSettingsId>;
  createUser_setting!: Sequelize.HasOneCreateAssociationMixin<UserSettingsCreationAttributes>;

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
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
