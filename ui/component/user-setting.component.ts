import { Component } from "../core/html.interfaces"
import { Column, Paragraph, RowSpaced } from "../core/html.elements";
import { Form, HiddenInput, SubmitButton } from "../core/html.elements"
import { Card } from "./card.components";
import { UserSettingModel } from "../../server/users/user-setting.model";
import { PotentialUser, UpdateSettingCommand } from "../../server/users/users.dto";
import { SettingName } from "../../server/users/user-settings.model";

interface UserSettingComponentModel {
    user: PotentialUser;
    userSettings: UserSettingModel;
    settingName: SettingName;
}


export const UserSettingComponent: Component<UserSettingComponentModel> = (model: UserSettingComponentModel) => {

    const icon = model.userSettings.value ? "✔️": "❌";

    return Card(
        Column(
            RowSpaced(
                Paragraph(`${model.userSettings.description!}:`), 
                Paragraph(icon)
            ),
            Form<UpdateSettingCommand>(`/users/${model.user?.id}/setting`,
                HiddenInput<UpdateSettingCommand>({ name: model.settingName, value: true }),
                SubmitButton("Change")
            ),
        ),
    )

}