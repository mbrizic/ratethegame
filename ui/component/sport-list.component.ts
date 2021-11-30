import { SportModel } from "../../server/sports/sports.model"
import { Grid } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { DimmedCard } from "./card.components"
import { SportDetailsLightComponent } from "./sport-details-light.component"

export const SportList: Component<SportModel[]> = (sports: SportModel[]) => {

    return Grid(
        ...sports.map(sport => DimmedCard(SportDetailsLightComponent(sport)))
    )

}