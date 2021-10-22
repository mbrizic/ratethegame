import { RemoveUserCommand } from "../../server/users/users.dto"
import { Column, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Form, HiddenInput, PasswordInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'

interface UserModel extends PageModel {
    email: string;
}

export const UserPage: Page<UserModel> = (model: UserModel) => {

    return Layout(model,
        Column(
            Heading2("User settings:"),
            Paragraph(`email address: ${model.email}`),
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
