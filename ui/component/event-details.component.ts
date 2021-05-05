import { humanize } from "../../server/core/date.service"
import { GetEventDto } from "../../server/events/events.dto"
import { Column, Heading2, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const EventDetails: Component<GetEventDto> = (event: GetEventDto) => {

    const sportLink = Link({ text: event.sportName, href: `/sports/${event.sportId}` })

    return Column(
        Heading2(
            Link({ text: event.name, href: `/events/${event.id}` })
        ),
        Paragraph(`Sport: ${sportLink}`),
        Paragraph(
            `${humanize(event.date)} (${event.date})`
        ),
        Paragraph(
            event.totalRatings > 0 
                ? `${event.ratingPercentage}% would recommend this (${event.totalRatings} ratings)`
                : `No ratings yet`
        ),
    )

}