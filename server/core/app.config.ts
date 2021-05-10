export interface AppConfig {
    postgresURL: string;
    jwtSecret: string;
    dbLoggingEnabled: boolean;
    port: string;
    nodeEnv: string;
}

export function getAppConfig(): AppConfig {
    return {
        postgresURL: ensureExists("POSTGRES_URL"),
        jwtSecret: ensureExists("JWT_SECRET"),
        dbLoggingEnabled: ensureExists("DB_LOGGING_ENABLED") === "true",
        port: ensureExists("PORT"),
        nodeEnv: ensureExists("NODE_ENV"),
    }
}

function ensureExists(settingName: string): string {
    const setting = process.env[settingName];

    if (setting == undefined) {
        throw new Error(`Setting ${settingName} does not exist`);
    }

    return setting;
}