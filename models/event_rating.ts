import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Events, EventsId } from './events';

export interface EventRatingAttributes {
  id?: number;
  rating: number;
  created_at?: Date;
  event_id: number;
}

export type EventRatingPk = "id";
export type EventRatingId = EventRating[EventRatingPk];
export type EventRatingCreationAttributes = Optional<EventRatingAttributes, EventRatingPk>;

export class EventRating extends Model<EventRatingAttributes, EventRatingCreationAttributes> implements EventRatingAttributes {
  id?: number;
  rating!: number;
  created_at?: Date;
  event_id!: number;

  // EventRating belongsTo Events via event_id
  event!: Events;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<Events>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<Events, EventsId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<Events>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EventRating {
    EventRating.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      }
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
    ]
  });
  return EventRating;
  }
}
