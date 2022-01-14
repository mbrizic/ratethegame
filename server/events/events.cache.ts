import { Cache } from '../core/cache.service';
import { EventModel } from './event.model';

type EventCacheKey = 'ALL-EVENTS' | 'UPCOMING-EVENTS' | 'BEST-RATED-EVENTS' | 'RECENT-EVENTS'

const eventsCache = new Cache<EventModel>()
export const eventsListCache = new Cache<EventModel[], EventCacheKey>()

export function cacheEventsList(key: EventCacheKey, events: EventModel[]) {
    eventsListCache.set(key, events)

    events.forEach(event => {
        eventsCache.set(event.slug, event)
    })
}

export function clearEventsCaches(slug?: string) {
    if (slug) {
        eventsCache.remove(slug)
    } else {
        eventsCache.clear()
    }
    eventsListCache.clear()
}

export default eventsCache