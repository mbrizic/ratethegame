import { Cache } from '../core/cache.service';
import eventsCache from '../events/events.cache';
import { SportModel } from './sports.model';

export type SportCacheKey = 'ALL-SPORTS'

export const sportsCache = new Cache<SportModel>()
export const sportsListCache = new Cache<SportModel[]>()

export function cacheSportsList(cacheKey: SportCacheKey, sports: SportModel[]) {
    sportsListCache.set(cacheKey, sports)

    sports.forEach(sport => {
        sportsCache.set(sport.slug, sport)

        sport.events.forEach(event => {
            eventsCache.set(event.slug, event)
        })
    })
}

export function getCachedSportsList(key: SportCacheKey) {
    return sportsListCache.get(key)
}

export function clearSportsCaches(slug?: string) {
    if (slug) {
        sportsCache.remove(slug)
    } else {
        sportsCache.clear()
    }
    sportsListCache.clear()
}