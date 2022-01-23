import { Column, Heading3, Link, Row, RowSpaced, Small, Spacing, Tag, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { orderByDescending } from "../../server/core/util"
import { SportModel } from "../../server/sports/sports.model"
import { Inline } from "../core/html.operator"

export const SportDetailsLightComponent: Component<SportModel> = (model: SportModel) => {

    const totalEvents = model.events.length
    const bestRatedEvent = orderByDescending(model.events, e => e.ratingPercentage)[0]

    const bestRatedEventLink = bestRatedEvent != null
        ? Link({ href: `/events/${bestRatedEvent.slug}`, text: bestRatedEvent.name }, { style: "color: grey" })
        : null

    return Column(
        Text(
            Inline(
                Link({ text: `${model.name}`, href: `/sports/${model.slug}` }),
                Small(
                    totalEvents
                        ? `(${totalEvents} events)`
                        : `(No events yet)`
                )
            ),
        ),
        Spacing(),
        Text(
            bestRatedEvent && bestRatedEvent.ratings.length > 0
                ? `⭐ ${bestRatedEventLink}`
                : " ",
        ),

    )
}