export interface AppConfig {
    postgresURL: string;
    jwtSecret: string;
    port: string;
}

export function getAppConfig(): AppConfig {
    return {
        postgresURL: ensureExists(process.env.POSTGRES_URL),
        jwtSecret: ensureExists(process.env.JWT_SECRET),
        port: ensureExists(process.env.PORT),
    }
}

function ensureExists(setting: string | undefined): string {
    if (setting == undefined) {
        throw new Error("Setting does not exist");
    }

    return setting;
}