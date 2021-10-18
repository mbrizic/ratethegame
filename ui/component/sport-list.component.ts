import { SportModel } from "../../server/sports/sports.model"
import { RowSpaced } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { SportComponent } from "./sport.component"

export const SportList: Component<SportModel[]> = (sports: SportModel[]) => {

    return RowSpaced(
        ...sports.map(SportComponent)
    )

}