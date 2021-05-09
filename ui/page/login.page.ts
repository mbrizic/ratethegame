import { ColumnCentered, Form, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'

interface LoginModel extends PageModel { }

export const LoginPage: Page<LoginModel> = (model: LoginModel) => {

    const registerLink = Link({ href: "/register", text: "register"});

    return Layout(model,
        ColumnCentered(
            Form("/login",
                TextInput({ placeholder: "Username", name: "username", value: "mario@mail.com" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "123456" }),
                Error(model.errorMessage),
                SubmitButton("Log in"),
            ),
            Paragraph(`... or ${registerLink} instead`)
        )
    )

}
