import { RemoveUserCommand, UpdateSettingCommand } from "../../server/users/users.dto"
import { Column, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Form, HiddenInput, PasswordInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'
import { SportSubscriptionsModel } from "../../server/users/user-sport-subscriptions.model";
import { UserSettingsModel } from "../../server/users/user-settings.model";

interface UserModel extends PageModel {
    email: string;
    subscriptions: SportSubscriptionsModel[];
    settings: UserSettingsModel;
}

export const UserPage: Page<UserModel> = (model: UserModel) => {

    return Layout(model,
        Column(
            Heading2("User settings:"),
            Paragraph(`email address: ${model.email}`),

            Paragraph(`subscriptions: ${model.subscriptions.map( subscription => subscription.sportName )}`),

            Column(
                Paragraph("Settings:"),

                Paragraph(model.settings.getReceiveTopRatedState()),
                Form<UpdateSettingCommand>(`/users/${model.user?.id}/setting`,
                    HiddenInput<UpdateSettingCommand>({ name: "setting", value: model.settings.getReceiveTopRatedName() }), 
                    HiddenInput<UpdateSettingCommand>({ name: "value", value: !model.settings.receiveTopRated }),
                    SubmitButton("Change")
                ),
            ),

            RowCentered(
                Form<RemoveUserCommand>(`/users/${model.user?.id}/remove`,
                    HiddenInput<RemoveUserCommand>({ name: "id", value: model.user?.id }),
                    PasswordInput({ placeholder: "Password", name: "password" }),
                    Error(model.errorMessage),
                    SubmitButton("Remove your user account")
                )   
            )
        )
    )

}
