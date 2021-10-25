import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sports, SportsId } from './sports';
import type { Users, UsersId } from './users';

export interface SportSubscriptionsAttributes {
  id: number;
  user_id: number;
  sport_id: number;
}

export type SportSubscriptionsPk = "id";
export type SportSubscriptionsId = SportSubscriptions[SportSubscriptionsPk];
export type SportSubscriptionsOptionalAttributes = "id";
export type SportSubscriptionsCreationAttributes = Optional<SportSubscriptionsAttributes, SportSubscriptionsOptionalAttributes>;

export class SportSubscriptions extends Model<SportSubscriptionsAttributes, SportSubscriptionsCreationAttributes> implements SportSubscriptionsAttributes {
  id!: number;
  user_id!: number;
  sport_id!: number;

  // SportSubscriptions belongsTo Sports via sport_id
  sport!: Sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<Sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<Sports, SportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<Sports>;
  // SportSubscriptions belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof SportSubscriptions {
    SportSubscriptions.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "unique_user_per_sport"
    },
    sport_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sports',
        key: 'id'
      },
      unique: "unique_user_per_sport"
    }
  }, {
    sequelize,
    tableName: 'sport_subscriptions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sport_subscriptions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "unique_user_per_sport",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "sport_id" },
        ]
      },
    ]
  });
  return SportSubscriptions;
  }
}
