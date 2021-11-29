import { getAppSettings } from "./app.settings";
import { buildDecorator } from "./decorators";
interface KeyValueStore<T> {
	[id: number | string]: T | null
}

type CacheKey = string | number
export interface CacheStats {
    cacheHits: number,
    cacheMisses: number
}

const counts: CacheStats = {
    cacheHits: 0,
    cacheMisses: 0
};
export class Cache<T, K = CacheKey> {
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

    public set(id: number | string | undefined, object: T) {
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

export function getCacheStats() {
    return counts
}

/**
 * Sets automatic cache. Examples on how to use:
 * 
 * 1. With `id` param - caches results of method under some string ID:
 * 
 * @Cacheable(someCache, 'SOME-CACHE-KEY')
 * function getAll()
 * 
 * 2. Without `id` param - id gets inferred from annotated function's return value.
 * When reading from cache it tries to get it from function's first param, and when writing 
 * it uses `id` property of returned object.
 * 
 * @Cacheable(someCache)
 * function getById(id: number)
 * 
 */
export function Cacheable<Type, Key, Id extends Key>(cache: Cache<Type, Key>, id?: Id) {
    return buildDecorator<Promise<any>>({
        runBefore: (...args) => {
            if (id) {
                return cache.get(id as any)
            } else if (!isNaN(args[0])) {
                return cache.get(args[0])
            } else {
                return null
            }
        },
        runAfter: async (promise) => {
            const result = await promise;

            const cacheKey = id
                ? id
                : result.id

            cache.set(cacheKey as any, result as any)
        }
    })
}

/**
 * 
 * Use to invalidate cache after the annotated function completes.
 * 
 * Based on what the annotated function returns, it does the following:
 *  - if it returns number, clear item with that ID from the cache
 *  - if it returns object containing `id` field, use that ID to clear the cache
 *  - if nothing is provided, clear entire cache
 * 
 */
export function InvalidatesCache<T, K>(cache: Cache<T, K>) {
    return buildDecorator<Promise<any>>({
        runAfter: async (promise) => {
            const result = await promise

            let id = null

            if (!isNaN(result)) {
                id = result
            } else if (result.id) {
                id = result.id
            }

            if (cache.get(id)) {
                cache.remove(id)
            } else {
                cache.clear()
            }
        }
    })
}
