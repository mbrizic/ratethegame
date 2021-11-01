import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { EventRating, EventRatingId } from './event_rating';
import type { Sports, SportsId } from './sports';
import type { Users, UsersId } from './users';

export interface EventsAttributes {
  id: number;
  name: string;
  datetime: Date;
  created_at: Date;
  created_by: number;
  sport_id: number;
}

export type EventsPk = "id";
export type EventsId = Events[EventsPk];
export type EventsOptionalAttributes = "id" | "created_at";
export type EventsCreationAttributes = Optional<EventsAttributes, EventsOptionalAttributes>;

export class Events extends Model<EventsAttributes, EventsCreationAttributes> implements EventsAttributes {
  id!: number;
  name!: string;
  datetime!: Date;
  created_at!: Date;
  created_by!: number;
  sport_id!: number;

  // Events hasMany EventRating via event_id
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
  // Events belongsTo Sports via sport_id
  sport!: Sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<Sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<Sports, SportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<Sports>;
  // Events belongsTo Users via created_by
  created_by_user!: Users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Events {
    Events.init({
    id: {
      autoIncrement: true,
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
      }
    },
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sports',
        key: 'id'
      }
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
