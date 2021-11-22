import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface UserSettingsAttributes {
  id: number;
  receive_top_rated_notifications: boolean;
  user_id: number;
}

export type UserSettingsPk = "id";
export type UserSettingsId = UserSettings[UserSettingsPk];
export type UserSettingsOptionalAttributes = "id";
export type UserSettingsCreationAttributes = Optional<UserSettingsAttributes, UserSettingsOptionalAttributes>;

export class UserSettings extends Model<UserSettingsAttributes, UserSettingsCreationAttributes> implements UserSettingsAttributes {
  id!: number;
  receive_top_rated_notifications!: boolean;
  user_id!: number;

  // UserSettings belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserSettings {
    UserSettings.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    receive_top_rated_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      unique: "unique_user"
    }
  }, {
    sequelize,
    tableName: 'user_settings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_user",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_settings_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return UserSettings;
  }
}
