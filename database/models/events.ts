import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EventRating, EventRatingId } from './event_rating';
import type { Sports, SportsId } from './sports';
import type { Users, UsersId } from './users';

export interface EventsAttributes {
  id: number;
  name: string;
  datetime: Date;
  createdAt: Date;
  createdBy: number;
  sportId: number;
}

export type EventsPk = "id";
export type EventsId = Events[EventsPk];
export type EventsOptionalAttributes = "id" | "createdAt";
export type EventsCreationAttributes = Optional<EventsAttributes, EventsOptionalAttributes>;

export class Events extends Model<EventsAttributes, EventsCreationAttributes> implements EventsAttributes {
  id!: number;
  name!: string;
  datetime!: Date;
  createdAt!: Date;
  createdBy!: number;
  sportId!: number;

  // Events hasMany EventRating via eventId
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
  // Events belongsTo Sports via sportId
  sport!: Sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<Sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<Sports, SportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<Sports>;
  // Events belongsTo Users via createdBy
  createdByUser!: Users;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Events {
    Events.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
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
    sportId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sports',
        key: 'id'
      },
      field: 'sport_id'
    }
  }, {
    sequelize,
    tableName: 'events',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "events_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Events;
  }
}
