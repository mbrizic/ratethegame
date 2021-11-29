import { Paragraph } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { EventInline } from "./event-inline.component"
import { Inline } from "../core/html.operator"
import { Card, DimmedCard } from "./card.components"
import { EventModel } from "../../server/events/event.model"
import { EventInlineLight } from "./event-inline-light.component"

export const EventList: Component<EventModel[]> = (events: EventModel[]) => {

    return events.length ? Inline(
        ...events.map(e => Card(
            EventInline(e)
        ))
    ) : Paragraph("No events found.")

}

export const EventListLight: Component<EventModel[]> = (events: EventModel[]) => {

    return events.length ? Inline(
        ...events.map(e => Card(
            EventInlineLight(e)
        ))
    ) : Paragraph("No events found.")

}