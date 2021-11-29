import { RemoveUserCommand, UpdateSettingCommand } from "../../server/users/users.dto"
import { Column, Heading2, Paragraph, RowSpaced, Strong, Text } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Form, HiddenInput, PasswordInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'
import { Card } from "../component/card.components";
import { Inline } from "../core/html.operator";
import { UserSettingComponent } from "../component/user-setting.component";
import { UserModel } from "../../server/users/users.model";

export interface UserPageModel extends PageModel {
    userData: UserModel;
}

export const UserPage: Page<UserPageModel> = (model: UserPageModel) => {

    return Layout(model,
        Column(
            Heading2("User profile:"),
            Card(
                RowSpaced(
                    Text("Email address:"),
                    Text(model.userData.email)
                )
            ),

            Card(
                RowSpaced(
                    Text("Subscriptions:"),
                    Text(`${model.userData.subscriptions.map(subscription => ` ${subscription.sportName}`)}`)
                )
            ),

            Heading2("Settings:"),
            RowSpaced(
                UserSettingComponent({
                    user: model.user, 
                    userSettings: model.userData.settings.getReceiveTopRatedNotificationsSetting(), 
                    settingName: "receiveTopRatedNotifications"})
            ),
            
            Heading2("Want to delete your account?"),
            Card(
                Column(
                    Paragraph(`This will permanently delete ${Strong("all")} of your user data, including your settings, all of your ratings and subscriptions. You won't be able to login anymore using your credentials.`, { class: "text-centered" }),
                    Inline(
                        Form<RemoveUserCommand>(`/users/${model.user?.id}/remove`,
                            HiddenInput<RemoveUserCommand>({ name: "id", value: model.user?.id }),
                            PasswordInput({ placeholder: "Password", name: "password" }),
                            Error(model.errorMessage),
                            SubmitButton("Delete my user account")
                        )
                    )
                )
            )
        )
    )

}
