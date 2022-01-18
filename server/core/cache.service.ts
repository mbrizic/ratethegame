import { getAppSettings } from "./app.settings";
import { buildDecorator } from "./decorators";
interface KeyValueStore<T> {
    [id: number | string]: T | null
}

type CacheIdKey = number | string
type CacheObjectKey = { id?: CacheIdKey, slug?: CacheIdKey }
type CacheListKey = CacheObjectKey[]

type Cacheable = CacheIdKey | CacheObjectKey | CacheListKey

export interface CacheStats {
    cacheHits: number,
    cacheMisses: number
}

const counts: CacheStats = {
    cacheHits: 0,
    cacheMisses: 0
};
export class Cache<T, K = CacheIdKey> {
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
 * it uses properties of returned object - first it tries `slug`, then `id` param.
 * 
 * @Cacheable(someCache)
 * function getById(id: number)
 * 
 */
export function Cacheable<Type extends Cacheable>(cache: Cache<Type, CacheIdKey>, id?: CacheIdKey) {
    return buildDecorator<Type>({
        // Checks if item is already in cache
        runBefore: (...args) => {
            if (id) {
                return cache.get(id as any)
            } else if (args[0]) {
                return cache.get(args[0])
            } else {
                return null
            }
        },
        // Writes the item to cache
        runAfter: (result: Type) => {
            const hasExplicitCacheKey = id != null;

            if (hasExplicitCacheKey) {
                cache.set(id, result)
            } else {
                const cacheableResult = result as CacheObjectKey

                const cacheKey = cacheableResult.slug
                    ? cacheableResult.slug
                    : cacheableResult.id

                cache.set(cacheKey, result)
            }
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
export function InvalidatesCache<Type, Key>(cache: Cache<Type, Key>) {
    return buildDecorator<any>({
        runAfter: (result) => {
            let id = null

            if (result.id) {
                id = result.id
            } else {
                id = result
            }

            if (cache.get(id)) {
                cache.remove(id)
            } else {
                cache.clear()
            }
        }
    })
}
