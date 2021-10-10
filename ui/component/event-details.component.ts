import { humanize } from "../../server/core/date.service"
import { GetEventDto } from "../../server/events/events.dto"
import { Column, Div, Heading2, Heading3, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { EventRating } from "./event-rating.component"

interface EventFormModel {
    isVotingPeriod: boolean;
    event: GetEventDto
}

function getRatings(model: EventFormModel): import("/home/jbaban@reversinglabs.lan/personal/ratethegame/ui/core/html.elements").ChildElement {
    const icon = model.event.ratingPercentage >= 50 ? "✔️": "❌"; 

    return Column(
        Heading3(`${model.event.ratingPercentage}% would recommend this ${icon}`, { class: "text-centered" }),
        EventRating(model.event),
        Paragraph(`As voted by ${model.event.totalRatings} users.`, { class: "text-centered" })
    )
}

export const EventDetails: Component<EventFormModel> = (model: EventFormModel) => {

    const eventLink = Link({ text: model.event.name, href: `/events/${model.event.id}` })
    const sportLink = Link({ text: model.event.sportName, href: `/sports/${model.event.sportId}` })
    const noRatingsMessage = `No ratings yet. ${model.isVotingPeriod ? ` Be the first one to vote:` : ``}` 

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
        model.event.totalRatings > 0 
            ? getRatings(model) 
            : Column(
                Heading3(noRatingsMessage, { class: "text-centered" })
            )
    )
}
