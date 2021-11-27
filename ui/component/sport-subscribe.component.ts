import { userInfo } from "os"
import { UserModel } from "../../server/users/users.model"
import { Big, Column, ColumnCentered, Form, Paragraph, Row, Spacing, SubmitButton } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"

interface SportSubscribeComponentModel {
    user: UserModel | undefined;
    sportId: number;
}

export const SportSubscribeComponent: Component<SportSubscribeComponentModel> = (model: SportSubscribeComponentModel) => {

    const subscribed = model.user?.subscriptions.some(subscription => subscription.sportId == model.sportId)

    return Card(
        Column(
            ColumnCentered(
                subscribed 
                  ? Form(`/sports/${model.sportId}/unsubscribe`, 
                        SubmitButton("Unsubscribe")
                    )
                  : Form(`/sports/${model.sportId}/subscribe`,
                        SubmitButton("Subscribe")
                    )
            )
        )
    )

}