import { EventModel } from "../../server/events/event.model";
import { Div} from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const EventRating: Component<EventModel> = (event: EventModel) => {

    const icon = event.ratingPercentage >= 50 ? "✔️" : "❌";

    const progressBar = Div("", {
        style: `width: ${event.ratingPercentage}%`,
        class: `progress-bar`
    })

    return Div(progressBar, { class: `progress-bar-background`})

}