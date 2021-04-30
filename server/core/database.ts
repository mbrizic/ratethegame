import { Sequelize } from 'sequelize';
import { initModels } from '../../database/models/init-models';
import { getAppConfig } from './app.config'

export const database = new Sequelize(getAppConfig().postgresURL, {
  // logging: false
})

initModels(database)

database.authenticate().catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});