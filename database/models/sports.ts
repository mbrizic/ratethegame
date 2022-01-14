import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Events, EventsId } from './events';
import type { UserSportSubscriptions, UserSportSubscriptionsId } from './user_sport_subscriptions';
import type { Users, UsersId } from './users';

export interface SportsAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  createdBy: number;
  slug: string;
}

export type SportsPk = "id";
export type SportsId = Sports[SportsPk];
export type SportsOptionalAttributes = "id" | "description" | "createdAt";
export type SportsCreationAttributes = Optional<SportsAttributes, SportsOptionalAttributes>;

export class Sports extends Model<SportsAttributes, SportsCreationAttributes> implements SportsAttributes {
  id!: number;
  name!: string;
  description?: string;
  createdAt!: Date;
  createdBy!: number;
  slug!: string;

  // Sports hasMany Events via sportId
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
  // Sports hasMany UserSportSubscriptions via sportId
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
  // Sports belongsTo Users via createdBy
  createdByUser!: Users;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sports {
    Sports.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "unique_sports_name"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'created_at'
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'created_by'
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "sport_slug_unique"
    }
  }, {
    sequelize,
    tableName: 'sports',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sport_slug_index",
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "sport_slug_unique",
        unique: true,
        fields: [
          { name: "slug" },
        ]
      },
      {
        name: "sports_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_sports_name",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  return Sports;
  }
}
