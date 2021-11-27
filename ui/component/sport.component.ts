import { RowSpaced } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { SportModel } from "../../server/sports/sports.model"
import { UserModel } from "../../server/users/users.model"
import { SportSubscribeComponent } from "./sport-subscribe.component"
import { SportDetailsComponent } from "./sport-details.component"

interface SportComponentModel {
    sport: SportModel;
    userData: UserModel | undefined;
}

export const SportComponent: Component<SportComponentModel> = (model: SportComponentModel) => {
    return Card(
        RowSpaced(
            SportDetailsComponent(model.sport),
            SportSubscribeComponent({
                    user: model.userData,
                    sportId: model.sport.id!,
            })
        )
    )

}