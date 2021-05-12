import { humanize } from "../../server/core/date.service"
import { GetEventDto } from "../../server/events/events.dto"
import { Column, Div, Heading2, Heading3, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { EventRating } from "./event-rating.component"

export const EventDetails: Component<GetEventDto> = (event: GetEventDto) => {

    const icon = event.ratingPercentage >= 50 ? "✔️": "❌"; 
    const eventLink = Link({ text: event.name, href: `/events/${event.id}` })
    const sportLink = Link({ text: event.sportName, href: `/sports/${event.sportId}` })

    return Column(
        Row(
            Column(
                Heading2(
                    eventLink
                ),
                Paragraph(
                    `${humanize(event.date)} (${event.date.toUTCString()})`
                )
            ),
            Column(
                Paragraph(`Sport: ${sportLink}`),
            )
        ),
        event.totalRatings > 0 ? Column(
            Heading3(`${event.ratingPercentage}% would recommend this ${icon}`, { class: "text-centered"}),
            EventRating(event),
            Paragraph(`As voted by ${event.totalRatings} users.`, { class: "text-centered" })
        ) : Column(
            Heading3(`No ratings yet. Be the first one to vote:`, { class: "text-centered" })
        )
    )

}