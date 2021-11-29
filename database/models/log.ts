import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LogAttributes {
  id: number;
  name: string;
  hash: string;
  createdAt: Date;
}

export type LogPk = "id";
export type LogId = Log[LogPk];
export type LogOptionalAttributes = "id" | "createdAt";
export type LogCreationAttributes = Optional<LogAttributes, LogOptionalAttributes>;

export class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
  id!: number;
  name!: string;
  hash!: string;
  createdAt!: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Log {
    Log.init({
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
    hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      field: 'created_at'
    }
  }, {
    sequelize,
    tableName: 'log',
    schema: 'migrations',
    timestamps: false,
    indexes: [
      {
        name: "log_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Log;
  }
}
