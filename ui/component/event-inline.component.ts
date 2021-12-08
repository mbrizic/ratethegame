import { humanize } from "../../server/core/date.service";
import { EventModel } from "../../server/events/event.model";
import { Tag, Link, RowSpaced, Text, Small } from "../core/html.elements";
import { Component } from "../core/html.interfaces";
import { Inline } from "../core/html.operator";
import { EventRatingSummary } from "./event-rating-summary.component";

export const EventInline: Component<EventModel> = (event: EventModel) => {
    
    const shouldDisplayRatingSummary = event.hasEventStarted() && event.hasAnyRatings()

    return RowSpaced(
        Text(
            Inline(
                Link({ text: event.name, href: `/events/${event.id}` }),
                Small(
                    Link({ text: 
                        `(${event.sportName})`, 
                        href: `/sports/${event.sportId}` 
                    }),
                ),
            )
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