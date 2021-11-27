import { EventModel } from './event.model';
import { createCache } from '../core/cache.service';

type EventCacheKey = 'ALL-EVENTS' | 'UPCOMING-EVENTS' | 'BEST-RATED-EVENTS' | 'RECENT-EVENTS'

const eventsCache = createCache<EventModel>()
const eventsListCache = createCache<EventModel[]>()

export function cacheEventsList(key: EventCacheKey, events: EventModel[]) {
    eventsListCache.set(key, events)

    events.forEach(event => {
        eventsCache.set(event.id, event)
    })
}

export function getCachedEventsList(key: EventCacheKey) {
    return eventsListCache.get(key)
}

export function clearEventsCaches(eventId?: number | string) {
    if (eventId) {
        eventsCache.remove(eventId)
    } else {
        eventsCache.clear()
    }
    eventsListCache.clear()
}

export default eventsCache