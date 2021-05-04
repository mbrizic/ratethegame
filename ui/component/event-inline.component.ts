import { GetEventDto } from "../../server/events/events.dto"
import { Column, Heading2, Heading4, Link, Paragraph, Row, RowSpaced, Span, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const EventInline: Component<GetEventDto> = (event: GetEventDto) => {

    return RowSpaced(
        Link({ text: event.name, href: `/events/${event.id}` }),
        Text(event.sportName),
        Text(
            event.totalRatings > 0 
                ? `${event.ratingPercentage}% would recommend this (${event.totalRatings} ratings)`
                : `No ratings yet`
        ),
    )

}