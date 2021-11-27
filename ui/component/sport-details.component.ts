import { Column, Heading2, Heading3, Link, Paragraph, Row, RowSpaced, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { orderByDescending } from "../../server/core/util"
import { SportModel } from "../../server/sports/sports.model"

export const SportDetailsComponent: Component<SportModel> = (model: SportModel) => {

    const totalEvents = model.events.length
    const bestRatedEvent = orderByDescending(model.events, e => e.ratingPercentage)[0]

    const bestRatedEventLink = bestRatedEvent != null
        ? Link({ href: `/events/${bestRatedEvent.id}`, text: bestRatedEvent.name })
        : null

    return Column(
        Heading3(
            Link({ text: model.name, href: `/sports/${model.id}` })
        ),
        totalEvents
            ? Text(`Has ${totalEvents} events. `)
            : Text(`No events yet for this one.`),
        bestRatedEvent && bestRatedEvent.totalRatings > 0
            ? Text(`Best rated one so far is ${bestRatedEventLink} with ${bestRatedEvent.totalRatings} votes and a score of ${bestRatedEvent.ratingPercentage}%`)
            : null
    )

}