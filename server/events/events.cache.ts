import { EventModel } from './event.model';
import { createCache } from '../core/cache.service';

const eventsCache = createCache<EventModel>()

export default eventsCache