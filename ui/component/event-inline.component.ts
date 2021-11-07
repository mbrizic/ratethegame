import { humanize } from "../../server/core/date.service";
import { EventModel } from "../../server/events/event.model";
import { Link, RowSpaced, Small, Styled, Text } from "../core/html.elements";
import { Component } from "../core/html.interfaces";
import { Inline } from "../core/html.operator";

export const EventInline: Component<EventModel> = (event: EventModel) => {

    return RowSpaced(
        Text(
            Link({ text: event.name, href: `/events/${event.id}` }),
            Small(` (${event.sportName})`),
        ),
        Text(
            event.hasEventStarted()
                ? eventRatingSummary(event)
                : eventTimeSummary(event)
        )
    )

}

function eventRatingSummary(event: EventModel) {
    const icon = event.isRatedFavourably() ? "✔️" : "😒";
    const cssClass = event.isRatedFavourably() ? "good" : "meh";

    return event.hasAnyRatings()
        ? Inline(
            Styled({ class: cssClass },
                `${icon} ${event.ratingPercentage}%`
            ),
            Small(`(${event.totalRatings} votes)`)
        )
        : `no votes yet`
}

function eventTimeSummary(event: EventModel) {
    return `${humanize(event.date)} ⌚`
}