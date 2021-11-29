import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Events, EventsId } from './events';
import type { Users, UsersId } from './users';

export interface EventRatingAttributes {
  id: number;
  wouldRecommend: boolean;
  createdAt: Date;
  createdBy: number;
  eventId: number;
}

export type EventRatingPk = "id";
export type EventRatingId = EventRating[EventRatingPk];
export type EventRatingOptionalAttributes = "id" | "createdAt";
export type EventRatingCreationAttributes = Optional<EventRatingAttributes, EventRatingOptionalAttributes>;

export class EventRating extends Model<EventRatingAttributes, EventRatingCreationAttributes> implements EventRatingAttributes {
  id!: number;
  wouldRecommend!: boolean;
  createdAt!: Date;
  createdBy!: number;
  eventId!: number;

  // EventRating belongsTo Events via eventId
  event!: Events;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<Events>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<Events, EventsId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<Events>;
  // EventRating belongsTo Users via createdBy
  createdByUser!: Users;
  getCreatedByUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreatedByUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreatedByUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EventRating {
    EventRating.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    wouldRecommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'would_recommend'
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
      unique: "unique_user_per_event",
      field: 'created_by'
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      },
      unique: "unique_user_per_event",
      field: 'event_id'
    }
  }, {
    sequelize,
    tableName: 'event_rating',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "event_rating_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_user_per_event",
        unique: true,
        fields: [
          { name: "created_by" },
          { name: "event_id" },
        ]
      },
    ]
  });
  return EventRating;
  }
}
