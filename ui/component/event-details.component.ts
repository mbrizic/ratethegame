import { humanize } from "../../server/core/date.service"
import { GetEventDto } from "../../server/events/events.dto"
import { Column, Div, Heading2, Heading3, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { EventRating } from "./event-rating.component"

interface EventFormModel {
    hasVotingPeriodNotBegun: boolean;
    event: GetEventDto
}

export const EventDetails: Component<EventFormModel> = (model: EventFormModel) => {

    const icon = model.event.ratingPercentage >= 50 ? "✔️": "❌"; 
    const eventLink = Link({ text: model.event.name, href: `/events/${model.event.id}` })
    const sportLink = Link({ text: model.event.sportName, href: `/sports/${model.event.sportId}` })

    const voteStats = model.event.totalRatings > 0 ? Column(
        Heading3(`${model.event.ratingPercentage}% would recommend this ${icon}`, { class: "text-centered" }),
        EventRating(model.event),
        Paragraph(`As voted by ${model.event.totalRatings} users.`, { class: "text-centered" })
    ) : Column(
        Heading3(`No ratings yet. Be the first one to vote:`, { class: "text-centered" })
    )

    return Column(
        Row(
            Column(
                Heading2(
                    eventLink
                ),
                Paragraph(
                    `${humanize(model.event.date)} (${model.event.date.toUTCString()})`
                )
            ),
            Column(
                Paragraph(`Sport: ${sportLink}`),
            )
        ),
        model.hasVotingPeriodNotBegun ? Column(
            Heading3(`No ratings yet.`, { class: "text-centered" })
        ) : voteStats 
    )

}