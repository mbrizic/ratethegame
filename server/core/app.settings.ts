export interface AppSettings {
    isCacheEnabled: boolean,
    areOptimizationHacksEnabled: boolean
}

const appSettings: AppSettings = {
    isCacheEnabled: true,
    areOptimizationHacksEnabled: false
}

export const getAppSettings = () => appSettings

export const updateAppSettings = (settings: AppSettings) => {
    appSettings.areOptimizationHacksEnabled = ensureBoolean(settings.areOptimizationHacksEnabled)
    appSettings.isCacheEnabled = ensureBoolean(settings.isCacheEnabled)
}

function ensureBoolean(value: any): boolean {
    return value === true || value === "true"
}

