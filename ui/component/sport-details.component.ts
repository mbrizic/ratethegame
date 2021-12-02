import { CardTag, Column, Heading2, Link, Small, Spacing, Text } from "../core/html.elements"
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
        Heading2(
            Link({ text: model.name, href: `/sports/${model.id}` })
        ),
        totalEvents
            ? CardTag(`${totalEvents} events`)
            : null,
        bestRatedEvent && bestRatedEvent.ratings.length > 0
            ? Text(`${Spacing()}⭐ Top rated event: ${bestRatedEventLink}`)
            : null
    )

}