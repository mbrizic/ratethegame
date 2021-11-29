import { CardTag, Column, Heading3, Link, Small, Spacing, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { orderByDescending } from "../../server/core/util"
import { SportModel } from "../../server/sports/sports.model"

export const SportDetailsLightComponent: Component<SportModel> = (model: SportModel) => {

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
            ? CardTag(`${totalEvents} events`)
            : CardTag("No events"),
        bestRatedEvent && bestRatedEvent.ratings.length > 0
            ? Text(`⭐ ${bestRatedEventLink}`)
            : null
    )

}