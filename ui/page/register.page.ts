import { ColumnCentered, Form, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface RegisterModel extends PageModel {
  
}

export const RegisterPage: Page<RegisterModel> = (model: RegisterModel) => {

    const loginLink = Link({ href: "/login", text: "login"})

    return Layout(model,
        ColumnCentered(
            Form("/register",
                TextInput({ placeholder: "Username", name: "username", value: "" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "" }),
                SubmitButton("Register")
            ),
            Paragraph(`... or ${loginLink} instead`)
        )
    )

}
