import { Column, Paragraph, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { GetEventDto } from "../../server/events/events.dto"
import { EventInline } from "./event-inline.component"
import { Inline } from "../core/html.operator"
import { Card } from "./card.component"

export const EventList: Component<GetEventDto[]> = (events: GetEventDto[]) => {

    return events.length ? Inline(
        ...events.map(e => Card(
            EventInline(e)
        ))
    ) : Paragraph("No events found.")

}