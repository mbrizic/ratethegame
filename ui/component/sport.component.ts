import { Column, Heading3, RowSpaced, Spacing } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { DimmedCard } from "./card.components"
import { SportModel } from "../../server/sports/sports.model"
import { UserModel } from "../../server/users/users.model"
import { SportSubscribeComponent } from "./sport-subscribe.component"
import { SportDetailsComponent } from "./sport-details.component"
import { EventListLight } from "./event-list.components"

interface SportComponentModel {
    sport: SportModel;
    userData: UserModel | undefined;
}

export const SportComponent: Component<SportComponentModel> = (model: SportComponentModel) => {
    return DimmedCard(
        Column(
            RowSpaced(
                SportDetailsComponent(model.sport),
                SportSubscribeComponent({
                        user: model.userData,
                        sportId: model.sport.id!,
                })
            ),
            Spacing(),
            Heading3(`Events (${model.sport.events.length}):`),
            EventListLight(model.sport.events)
        )
    )

}