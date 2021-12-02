import { EventModel } from "../../server/events/event.model";
import { Small, Styled } from "../core/html.elements";
import { Component } from "../core/html.interfaces";
import { Inline } from "../core/html.operator";

export const EventRatingSummary: Component<EventModel> = (event: EventModel) => {
    
    const icon = event.isRatedFavourably() ? "✔️" : "😒";
    const cssClass = event.isRatedFavourably() ? "good" : "meh";

    return event.hasAnyRatings()
        ? Inline(
            Styled({ class: cssClass },
                `${icon} ${event.ratingPercentage}%`
            ),
            Small(`(${event.ratings.length} votes)`)
        )
        : `no votes yet`

}