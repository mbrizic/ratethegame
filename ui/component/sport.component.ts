import { Column, Heading2, Heading3, Link, Paragraph, Row, Text } from "../core/html.elements"
import { GetSportDto } from "../../server/sports/sports.dto"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { orderByDescending } from "../../server/core/util"

export const SportComponent: Component<GetSportDto> = (sport: GetSportDto) => {

    const totalEvents = sport.events.length
    const bestRatedEvent = orderByDescending(sport.events, e => e.ratingPercentage)[0]

    const bestRatedEventLink = bestRatedEvent != null 
        ? Link({ href: `/events/${bestRatedEvent.id}`, text: bestRatedEvent.name})
        : null

    return Card(
        Column(
            Heading3(
                Link({text: sport.name, href: `/sports/${sport.id}`})
            ),
            totalEvents 
                ? Text(`Has ${totalEvents} events. `) 
                : Text(`No events yet for this one.`),
            bestRatedEvent && bestRatedEvent.totalRatings > 0
                ? Text(`Best rated one so far is ${bestRatedEventLink} with ${bestRatedEvent.totalRatings} votes and a score of ${bestRatedEvent.ratingPercentage}%`)
                : null
        )
    )

}