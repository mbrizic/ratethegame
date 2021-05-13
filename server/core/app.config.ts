export interface AppConfig {
    postgresURL: string;
    jwtSecret: string;
    dbLoggingEnabled: boolean;
    cssCachingEnabled: boolean;
    isDebugMode: boolean;
    port: string;
    nodeEnv: string;
}

export function getAppConfig() {
    return appConfig
}

const appConfig: AppConfig = {
    postgresURL: ensureExists("POSTGRES_URL"),
    jwtSecret: ensureExists("JWT_SECRET"),
    dbLoggingEnabled: ensureExists("DB_LOGGING_ENABLED") === "true",
    cssCachingEnabled: ensureExists("CSS_CACHING_ENABLED") === "true",
    isDebugMode: ensureExists("IS_DEBUG_MODE") === "true",
    port: ensureExists("PORT"),
    nodeEnv: ensureExists("NODE_ENV"),
}

function ensureExists(settingName: string): string {
    const setting = process.env[settingName];

    if (setting == undefined) {
        throw new Error(`Setting ${settingName} does not exist`);
    }

    return setting;
}