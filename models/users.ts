import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface UsersAttributes {
  id?: number;
  email: string;
  password: string;
  is_admin: boolean;
  created_at?: Date;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersCreationAttributes = Optional<UsersAttributes, UsersPk>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id?: number;
  email!: string;
  password!: string;
  is_admin!: boolean;
  created_at?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    Users.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "unique_users_email"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "unique_users_email",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Users;
  }
}
