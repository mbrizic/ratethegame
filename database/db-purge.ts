import { Sequelize } from 'sequelize';
import { purgeDatabase } from '../server/core/migrations';
import 'dotenv/config';

const database = new Sequelize(process.env.POSTGRES_URL, {
  logging: false
})

purgeDb()

async function purgeDb() {
  console.log("Purging database...")

  await purgeDatabase(database)
  
  console.log("Done.")
}

