import { getAppSettings } from "./app.settings";

interface Cache<T> {
	[id: number | string]: T | null
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
    let cache: Cache<T> = {}

    function get(id: number | string) {
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

    function set(id: number | string | undefined, object: T) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }

        if (id != undefined && cache[id] == null) {
            cache[id] = object
        }
    }

    function remove(id: number | string | undefined) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }
        
        if (id) {
            cache[id] = null
        }
    }

    function clear() {
        cache = {}
    }

    return {
        get, set, remove, clear
    }
}

export function getCacheStats() {
    return counts
}