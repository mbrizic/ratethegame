import { Sequelize } from 'sequelize';
import { migrateDatabase } from '../server/core/migrations';
import { SequelizeAuto } from "sequelize-auto";
import 'dotenv/config';
import { getAppConfig } from '../server/core/app.config';
import { exit } from 'process';

const database = new Sequelize(getAppConfig().postgresURL, {
	logging: getAppConfig().dbLoggingEnabled
})

runMigrations()

async function runMigrations() {
	console.log("Migrating database to latest version...")

	await migrateDatabase(database)

	console.log("\nGenerating TypeScript classes from DB tables...")

	const sequelizeAuto = new SequelizeAuto(database, null, null, {
		directory: "./database/models",
		dialect: "postgres",
		lang: "ts",
		caseModel: "p",
		caseProp: "c",
		singularize: false,
	});

	await sequelizeAuto.run();

	console.log("\nMigration done.")

	exit()
}

