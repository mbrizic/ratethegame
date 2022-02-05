import { getAppSettings } from "../app.settings";

interface KeyValueStore<T> {
    [id: number | string]: T | null
}

export type CacheIdKey = number | string
export type CacheObjectKey = { id?: CacheIdKey, slug?: CacheIdKey }
export type CacheListKey = CacheObjectKey[]

export type Cacheable = CacheIdKey | CacheObjectKey | CacheListKey

export interface CacheStats {
    cacheHits: number,
    cacheMisses: number
}

export interface ICache<T, K> {
    get: (id: CacheIdKey) => T | null
    set: (id: CacheIdKey | undefined, object: T) => void
    remove: (id: CacheIdKey | undefined) => void
    clear: () => void
}

let createdCaches: Cache<any, CacheIdKey>[] = []

const counts: CacheStats = {
    cacheHits: 0,
    cacheMisses: 0
};

class Cache<T, K> implements ICache<T, K> {
    private cache: KeyValueStore<T> = {}

    public get(id: number | string) {
        if (!getAppSettings().isCacheEnabled) {
            return null
        }

        const cached = this.cache[id]

        if (cached) {
            counts.cacheHits++
        } else {
            counts.cacheMisses++
        }

        return cached
    }

    public set(id: CacheIdKey | undefined, object: T) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }

        if (id != undefined && this.cache[id] == null) {
            this.cache[id] = object
        }
    }

    public remove(id: number | string | undefined) {
        if (!getAppSettings().isCacheEnabled) {
            return
        }

        if (id) {
            this.cache[id] = null
        }
    }

    public clear() {
        this.cache = {}
    }

}

export function createNewCache<T, K = CacheIdKey>() {
    const cache = new Cache<T, K>()

    createdCaches.push(cache)

    return cache
}

export function purgeAllCaches() {
    createdCaches.forEach(cache => cache.clear())

    createdCaches = []
}

export function getCacheStats() {
    return counts
}