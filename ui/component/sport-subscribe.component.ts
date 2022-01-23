import { UserModel } from "../../server/users/users.model"
import { Column, ColumnCentered, Form, Small, Spacing, Styled, SubmitButton } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export interface SportSubscribeComponentModel {
    user: UserModel | undefined;
    sportSlug: string;
    sportId: number;
}

export const SportSubscribeComponent: Component<SportSubscribeComponentModel> = (model: SportSubscribeComponentModel) => {

    const subscribed = model.user?.subscriptions.some(subscription => subscription.sportId == model.sportId)

    return Column(
        Spacing(),
        subscribed
            ? Column(
                Styled({ class: "good text-centered" },
                    Small("You are subscribed to this sport.")
                ),
                Form(`/sports/${model.sportSlug}/unsubscribe`,
                    SubmitButton("Unsubscribe", { class: "dimmed" })
                )
            )
            : Form(`/sports/${model.sportSlug}/subscribe`,
                SubmitButton("Subscribe")
            )
    )

}