import { Sequelize } from 'sequelize';
import { purgeDatabase } from '../server/core/migrations';
import 'dotenv/config';
import { getAppConfig } from '../server/core/app.config';

const database = new Sequelize(getAppConfig().postgresURL, {
	logging: getAppConfig().dbLoggingEnabled
})

purgeDb()

async function purgeDb() {
	console.log("Purging database...")

	await purgeDatabase(database)

	console.log("Done.")
}

