import { GetEventDto } from "../../server/events/events.dto"
import { Column, Heading2, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const EventComponent: Component<GetEventDto> = (event: GetEventDto) => {

    return Column(
        Heading2(
            Link({ text: event.name, href: `/events/${event.id}` })
        ),
        Paragraph(event.sportName),
        Paragraph(
            event.totalRatings > 0 
                ? `${event.ratingPercentage}% would recommend this (${event.totalRatings} ratings)`
                : `No ratings yet`
        ),
    )

}