import { Column, Heading2, Link, Paragraph, Row } from "../core/html.elements"
import { GetSportDto } from "../../server/sports/sports.dto"
import { Component } from "../core/html.interfaces"

export const SportComponent: Component<GetSportDto> = (sport: GetSportDto) => {

    return Column(
        Heading2(
            Link({text: sport.name, href: `/sports/${sport.id}`})
        ),
        ...sport.events.map(e => Paragraph(
            Link({ href: `/events/${e.id}`, text: e.name})
        ))
    )

}