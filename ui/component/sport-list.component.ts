import { Column, Heading2, Paragraph, Row, RowSpaced } from "../core/html.elements"
import { GetSportDto } from "../../server/sports/sports.dto"
import { Component } from "../core/html.interfaces"
import { SportComponent } from "./sport.component"

export const SportList: Component<GetSportDto[]> = (sports: GetSportDto[]) => {

    return RowSpaced(
        ...sports.map(SportComponent)
    )

}