import { Sequelize } from 'sequelize';
import fs = require('fs')
import crypto = require('crypto')
import path = require('path')

const config: Config = {
	scriptsPath: "./database",
	encoding: "utf-8"
}

interface Config {
	scriptsPath: string,
	encoding: BufferEncoding
}

export async function migrateDatabase(database: Sequelize) {

	await setupMigrationTables()

	console.log("MIGRATION STARTED")

	await readAllScriptFiles()

	console.log("MIGRATION DONE")

	async function readAllScriptFiles() {
		const scripts = fs.readdirSync(config.scriptsPath)

		for (const scriptName of scripts) {
			const scriptContents = fs.readFileSync(
				path.join(config.scriptsPath, scriptName),
				config.encoding
			)

			const isExecuted = await checkIfScriptExecuted(scriptName)

			if (isExecuted) {
				console.log("Already executed, skipping")

				const isModified = await checkIfScriptModified(scriptName, scriptContents)
				if (isModified) {
					error(`Error: script ${scriptName} modified.`)
				}
			} else {
				await executeScript(scriptContents)
				await markAsExecuted(scriptName, scriptContents)
			}
		}
	}

	async function setupMigrationTables(shouldReset: boolean = false) {
		if (shouldReset) {
			await database.query('DROP SCHEMA IF EXISTS migrations CASCADE;')
		}

		await database.query(`
			CREATE SCHEMA IF NOT EXISTS migrations;

			CREATE TABLE IF NOT EXISTS migrations.log(
				id SERIAL PRIMARY KEY,
				name TEXT NOT NULL,
				hash TEXT NOT NULL,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			);
		`)
	}

	async function markAsExecuted(name: string, contents: string) {
		await database.query({
			query: `INSERT INTO migrations.log(name, hash) VALUES (?, ?)`,
			values: [name, toHash(contents)]
		})
	}

	async function executeScript(scriptContents: string) {
		await database.query(scriptContents)
	}

	async function checkIfScriptExecuted(name: string) {
		const [results, metadata] = await database.query({
			query: `SELECT * FROM migrations.log where name = ? LIMIT 1`,
			values: [name]
		})

		return results.length > 0
	}

	async function checkIfScriptModified(name: string, contents: string) {
		const [results, metadata] = await database.query({
			query: `SELECT * FROM migrations.log where name = ? and hash != ? LIMIT 1`,
			values: [name, toHash(contents)]
		})

		return results.length > 0
	}

}

function error(err: string) {
	console.error(err)
	throw Error(err)
}

function toHash(input: string) {
	return crypto.createHash('md5').update(input).digest("hex");
}