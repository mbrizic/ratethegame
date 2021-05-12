import { GetEventDto } from "../../server/events/events.dto"
import { Column, Div, Heading2, Heading3, Link, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const EventRating: Component<GetEventDto> = (event: GetEventDto) => {

    const icon = event.ratingPercentage >= 50 ? "✔️" : "❌";

    const progressBar = Div("", {
        style: `width: ${event.ratingPercentage}%`,
        class: `progress-bar`
    })

    return Div(progressBar, { class: `progress-bar-background`})

}