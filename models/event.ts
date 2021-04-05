import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface EventAttributes {
  id?: number;
  previousEventId?: number;
  eventType: string;
  entityType: string;
  entityId: number;
  entityName: string;
  entityContents: string;
  deletedAt?: Date;
}

export type EventPk = "id";
export type EventId = Event[EventPk];
export type EventCreationAttributes = Optional<EventAttributes, EventPk>;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  id?: number;
  previousEventId?: number;
  eventType!: string;
  entityType!: string;
  entityId!: number;
  entityName!: string;
  entityContents!: string;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Event {
    Event.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    previousEventId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eventType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    entityType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    entityName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    entityContents: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'events',
    schema: 'public',
    timestamps: false,
    paranoid: true,
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
  return Event;
  }
}
