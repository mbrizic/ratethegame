import { getAppSettings } from "./app.settings";

interface Cache<T> {
	[id: number]: T | null
}

export interface CacheStats {
    cacheHits: number,
    cacheMisses: number
}

const counts: CacheStats = {
    cacheHits: 0,
    cacheMisses: 0
};

export function createCache<T>() {
    const cache: Cache<T> = {}

    function get(id: number): T | null {
        if (!getAppSettings().isCacheEnabled) {
            return null
        }

        const cached = cache[id]
        
        if (cached) {
            counts.cacheHits++
        } else {
            counts.cacheMisses++
        }

        return cached
    }

    function set(id: number, object: T) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }

        if (cache[id] == null) {
            cache[id] = object
        }
    }

    function clear(id: number) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }
        
        cache[id] = null
    }

    return {
        get, set, clear
    }
}

export function getCacheStats() {
    return counts
}