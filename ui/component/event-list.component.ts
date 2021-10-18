import { Paragraph } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { EventInline } from "./event-inline.component"
import { Inline } from "../core/html.operator"
import { Card } from "./card.component"
import { EventModel } from "../../server/events/event.model"

export const EventList: Component<EventModel[]> = (events: EventModel[]) => {

    return events.length ? Inline(
        ...events.map(e => Card(
            EventInline(e)
        ))
    ) : Paragraph("No events found.")

}