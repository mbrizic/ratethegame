import { humanize } from "../../server/core/date.service"
import { EventModel } from "../../server/events/event.model"
import { Big, ChildElement, Column, ColumnCentered, Heading2, Link, Paragraph, Row, RowSpaced, Small, Spacing, Strong, Styled } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Inline } from "../core/html.operator"

interface EventFormModel {
    event: EventModel
}

function getRatingsSummary(model: EventFormModel): ChildElement {
    if (model.event.ratings.length <= 0) {
        const noRatingsMessage = `No ratings yet. ${model.event.isVotingAllowed() ? ` Be the first one to vote.` : ``}`
        return Strong(noRatingsMessage)
    }

    const icon = model.event.isRatedFavourably() ? "✔️" : "😒";
    const cssClass = model.event.isRatedFavourably() ? "good" : "meh";

    return ColumnCentered(
        Spacing(),
        Row(
            Styled(
                { class: cssClass }, Big(`${model.event.ratingPercentage}% ${icon}`)
            ),
        ),
        Styled({class: 'text-centered'},
            Small(`${model.event.ratings.length} votes.`)
        )
    )
}

export const EventDetails: Component<EventFormModel> = (model: EventFormModel) => {

    const eventLink = Link({ text: model.event.name, href: `/events/${model.event.id}` })
    const sportLink = Link({ text: model.event.sportName, href: `/sports/${model.event.sportId}` })

    return Column(
        Heading2(
            Inline(
                eventLink,
                Small(`(${sportLink})`)
            )
        ),
        RowSpaced(
            Column(
                Paragraph(
                    `${humanize(model.event.date)}`
                ),
                Small(`(${model.event.date.toUTCString()})`),
            ),
            Column(
                getRatingsSummary(model)
            )
        ),
    )
}
