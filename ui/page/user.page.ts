import { RemoveUserCommand, UpdateSettingCommand } from "../../server/users/users.dto"
import { Column, Heading2, Paragraph, RowSpaced, Text } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Form, HiddenInput, PasswordInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'
import { UserSportSubscriptionsModel } from "../../server/users/user-sport-subscriptions.model";
import { UserSettingsModel } from "../../server/users/user-settings.model";
import { Card } from "../component/card.component";
import { Inline } from "../core/html.operator";
import { UserSettingComponent } from "../component/user-setting.component";

export interface UserModel extends PageModel {
    email: string;
    subscriptions: UserSportSubscriptionsModel[];
    settings: UserSettingsModel;
}

export const UserPage: Page<UserModel> = (model: UserModel) => {

    return Layout(model,
        Column(
            Heading2("User profile:"),
            Card(
                RowSpaced(
                    Text("Email address:"),
                    Text(model.email)
                )
            ),

            Card(
                RowSpaced(
                    Text("Subscriptions:"),
                    Text(`${model.subscriptions.map(subscription => subscription.sportName)}`)
                )
            ),

            Heading2("Settings:"),
            RowSpaced(
                ...model.settings.getSettings().map(setting => UserSettingComponent({user: model.user, userSettings: setting}))
            ),
            
            Heading2("Want to delete your account?"),
            Inline(
                Form<RemoveUserCommand>(`/users/${model.user?.id}/remove`,
                    HiddenInput<RemoveUserCommand>({ name: "id", value: model.user?.id }),
                    PasswordInput({ placeholder: "Password", name: "password" }),
                    Error(model.errorMessage),
                    SubmitButton("Delete your user account")
                )
            )
        )
    )

}
