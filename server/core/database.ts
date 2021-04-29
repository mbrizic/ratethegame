import { Sequelize } from 'sequelize';
import { initModels } from '../../database/models/init-models';

export const database = new Sequelize(process.env.POSTGRES_URL, {
  // logging: false
})

initModels(database)

database.authenticate().catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});