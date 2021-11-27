import { Column, Heading3, Link, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { orderByDescending } from "../../server/core/util"
import { SportModel } from "../../server/sports/sports.model"

export const SportComponent: Component<SportModel> = (sport: SportModel) => {

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
            bestRatedEvent && bestRatedEvent.ratings.length > 0
                ? Text(`Best rated one so far is ${bestRatedEventLink} with ${bestRatedEvent.ratings.length} votes and a score of ${bestRatedEvent.ratingPercentage}%`)
                : null
        )
    )

}