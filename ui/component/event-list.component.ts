import { Column, Row } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { GetEventDto } from "../../server/events/events.dto"
import { EventComponent } from "./event.component"

export const EventList: Component<GetEventDto[]> = (events: GetEventDto[]) => {

    return Row(
        ...events.map(EventComponent)
    )

}