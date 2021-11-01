import { Component } from "../core/html.interfaces"
import { Column, Heading2, Paragraph, RowSpaced, Text } from "../core/html.elements";
import { Form, HiddenInput, PasswordInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Card } from "../component/card.component";
import { Inline } from "../core/html.operator";
import { UserSettingModel } from "../../server/users/user-setting-model";
import { PotentialUser, UpdateSettingCommand } from "../../server/users/users.dto";


interface UserSettingComponentModel {
    user: PotentialUser;
    userSettings: UserSettingModel;
}


export const UserSettingComponent: Component<UserSettingComponentModel> = (model: UserSettingComponentModel) => {

    const icon = model.userSettings.value ? "✔️": "❌";

    return Card(
        Column(
            RowSpaced(
                Paragraph(model.userSettings.description), 
                Paragraph(icon)
            ),
            Form<UpdateSettingCommand>(`/users/${model.user?.id}/setting`,
                HiddenInput<UpdateSettingCommand>({ name: "setting", value: model.userSettings.column_name }),
                HiddenInput<UpdateSettingCommand>({ name: "value", value: !model.userSettings.value }),
                SubmitButton("Change")
            ),
        ),
    )

}