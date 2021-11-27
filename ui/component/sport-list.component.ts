import { SportModel } from "../../server/sports/sports.model"
import { RowSpaced } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { SportDetailsComponent } from "./sport-details.component"

export const SportList: Component<SportModel[]> = (sports: SportModel[]) => {

    return RowSpaced(
        ...sports.map(sport => Card(SportDetailsComponent(sport)))
    )

}