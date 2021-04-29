import { Sequelize } from 'sequelize';
import { migrateDatabase } from '../server/core/migrations';
import { SequelizeAuto } from "sequelize-auto";
import 'dotenv/config';

const database = new Sequelize(process.env.POSTGRES_URL, {
  logging: false
})

runMigrations()

async function runMigrations() {
  console.log("Migrating database to latest version...")

  await migrateDatabase(database)
  
  console.log("Generating TypeScript classes from DB tables...")
  
  const sequelizeAuto = new SequelizeAuto(database, null, null, {
    directory: "./database/models",
    dialect: "postgres",
    lang: "ts",
    caseModel: "p",
    singularize: false,
  });
  
  sequelizeAuto.run();
  
  console.log("\nMigration done.")
}

