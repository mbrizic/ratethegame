import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sports, SportsId } from './sports';
import type { Users, UsersId } from './users';

export interface UserSportSubscriptionsAttributes {
  id: number;
  user_id: number;
  sport_id: number;
}

export type UserSportSubscriptionsPk = "id";
export type UserSportSubscriptionsId = UserSportSubscriptions[UserSportSubscriptionsPk];
export type UserSportSubscriptionsOptionalAttributes = "id";
export type UserSportSubscriptionsCreationAttributes = Optional<UserSportSubscriptionsAttributes, UserSportSubscriptionsOptionalAttributes>;

export class UserSportSubscriptions extends Model<UserSportSubscriptionsAttributes, UserSportSubscriptionsCreationAttributes> implements UserSportSubscriptionsAttributes {
  id!: number;
  user_id!: number;
  sport_id!: number;

  // UserSportSubscriptions belongsTo Sports via sport_id
  sport!: Sports;
  getSport!: Sequelize.BelongsToGetAssociationMixin<Sports>;
  setSport!: Sequelize.BelongsToSetAssociationMixin<Sports, SportsId>;
  createSport!: Sequelize.BelongsToCreateAssociationMixin<Sports>;
  // UserSportSubscriptions belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserSportSubscriptions {
    UserSportSubscriptions.init({
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
    tableName: 'user_sport_subscriptions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_user_per_sport",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "sport_id" },
        ]
      },
      {
        name: "user_sport_subscriptions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return UserSportSubscriptions;
  }
}
