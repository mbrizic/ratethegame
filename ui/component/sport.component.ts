import { Column, Heading2, Heading3, Link, Paragraph, Row, Text } from "../core/html.elements"
import { GetSportDto } from "../../server/sports/sports.dto"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { Inline } from "../core/html.operator"
import { EventList } from "./event-list.component"

export const SportComponent: Component<GetSportDto> = (sport: GetSportDto) => {

    return Card(
        Column(
            Heading3(
                Link({text: sport.name, href: `/sports/${sport.id}`})
            ),
            sport.events.length ? Inline(
                ...sport.events.map(e => Column(
                    Link({ href: `/events/${e.id}`, text: e.name}),
                    Text(e.totalRatings > 0 
                        ? `- ${e.ratingPercentage}% (${e.totalRatings})`
                        : `No ratings yet`,)
                ))
            ) : Paragraph("No events for this sport yet. Add something pls.")
        )
    )

}