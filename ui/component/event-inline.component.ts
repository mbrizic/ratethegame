import { humanize } from "../../server/core/date.service";
import { EventModel } from "../../server/events/event.model";
import { Link, RowSpaced, Small, Styled, Text } from "../core/html.elements";
import { Component } from "../core/html.interfaces";
import { EventRatingSummary } from "./event-rating-summary";

export const EventInline: Component<EventModel> = (event: EventModel) => {
    
    const shouldDisplayRatingSummary = event.hasEventStarted() && event.hasAnyRatings()

    return RowSpaced(
        Text(
            Link({ text: event.name, href: `/events/${event.id}` }),
            Small(` (${event.sportName})`),
        ),
        Text(
            shouldDisplayRatingSummary
                ? EventRatingSummary(event)
                : eventTimeSummary(event)
        )
    )

}

function eventTimeSummary(event: EventModel) {
    return `${humanize(event.date)} ⌚`
}