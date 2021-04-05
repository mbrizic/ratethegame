import { Sequelize } from 'sequelize';
import { initModels } from '../../models/init-models';
import { migrateDatabase } from './migrations';

export const database = new Sequelize(process.env.POSTGRES_URL, {
  // logging: false
})

initModels(database)

database.authenticate().catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});

migrateDatabase(database)