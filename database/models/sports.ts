import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Events, EventsId } from './events';
import type { Users, UsersId } from './users';

export interface SportsAttributes {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  created_by: number;
}

export type SportsPk = "id";
export type SportsId = Sports[SportsPk];
export type SportsOptionalAttributes = "id" | "description" | "created_at";
export type SportsCreationAttributes = Optional<SportsAttributes, SportsOptionalAttributes>;

export class Sports extends Model<SportsAttributes, SportsCreationAttributes> implements SportsAttributes {
  id!: number;
  name!: string;
  description?: string;
  created_at!: Date;
  created_by!: number;

  // Sports hasMany Events via sport_id
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
  // Sports belongsTo Users via created_by
  created_by_user!: Users;
  getCreated_by_user!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCreated_by_user!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCreated_by_user!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sports {
    Sports.init({
    id: {
      autoIncrement: true,
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
    }
  }, {
    sequelize,
    tableName: 'sports',
    schema: 'public',
    timestamps: false,
    indexes: [
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
