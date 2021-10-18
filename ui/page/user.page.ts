import { Column, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface UserModel extends PageModel {
    email: string;
}

export const UserPage: Page<UserModel> = (model: UserModel) => {

    return Layout(model,
        Column(
            Heading2("User settings:"),
            Paragraph(`email address: ${model.email}`)
        )
    )

    // TODO public deleteUser

}
