import { now } from "./date.service"

let analyticsEvents: AnalyticsEvent[] = [];

export function recordAnalyticsEvent(type: EventType, userId: number, relatedEntityId?: number, additionalMetadata?: string) {
    analyticsEvents.push({
        timestamp: now(),
        type,
        userId,
        relatedEntityId,
        additionalMetadata
    })
}

export function getAnalyticsEvents() {
    return analyticsEvents
}

export function clearAnalyticsEvents() {
    analyticsEvents = []
}

export type EventType = "UserCreated" | "UserDeleted" | "UserVoted" | "UserRemovedVote" | "UserSubscribedToSport" | "UserUnsubscribedFromSport"

export interface AnalyticsEvent {
    type: EventType
    timestamp: Date
    userId: number
    relatedEntityId?: number
    additionalMetadata?: string
}
