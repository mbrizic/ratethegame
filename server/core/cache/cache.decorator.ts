import { buildDecorator } from "../decorators";
import { Cacheable, CacheIdKey, ICache, CacheObjectKey } from "./cache.service";

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
export function Cacheable<Type extends Cacheable>(cache: ICache<Type, CacheIdKey>, id?: CacheIdKey) {
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
export function InvalidatesCache<Type, Key>(cache: ICache<Type, Key>) {
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
