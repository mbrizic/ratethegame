import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Events, EventsId } from './events';
import type { Users, UsersId } from './users';

export interface EventRatingAttributes {
  id?: number;
  would_recommend: boolean;
  created_at?: Date;
  created_by: number;
  event_id: number;
}

export type EventRatingPk = "id";
export type EventRatingId = EventRating[EventRatingPk];
export type EventRatingCreationAttributes = Optional<EventRatingAttributes, EventRatingPk>;

export class EventRating extends Model<EventRatingAttributes, EventRatingCreationAttributes> implements EventRatingAttributes {
  id?: number;
  would_recommend!: boolean;
  created_at?: Date;
  created_by!: number;
  event_id!: number;

  // EventRating belongsTo Events via event_id
  event!: Events;
  getEvent!: Sequelize.BelongsToGetAssociationMixin<Events>;
  setEvent!: Sequelize.BelongsToSetAssociationMixin<Events, EventsId>;
  createEvent!: Sequelize.BelongsToCreateAssociationMixin<Events>;
  // EventRating belongsTo Users via created_by
  created_by_user!: Users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof EventRating {
    EventRating.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    would_recommend: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "unique_user_per_event"
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id'
      },
      unique: "unique_user_per_event"
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
