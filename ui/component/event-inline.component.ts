import { EventModel } from "../../server/events/event.model";
import { Link, RowSpaced, Text } from "../core/html.elements";
import { Component } from "../core/html.interfaces";

export const EventInline: Component<EventModel> = (event: EventModel) => {

    const icon = event.isRatedFavourably() ? "✔️" : "❌";

    return RowSpaced(
        Text(
            Link({ text: event.name, href: `/events/${event.id}` }),
            Text(` (${event.sportName})`),
        ),
        Text(
            event.hasAnyRatings()
                ? `${event.ratingPercentage}% would recommend this (${event.totalRatings} ratings) ${icon}`
                : `No ratings yet`
        )
    )

}