import { Column, Form, Heading1, Heading2, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface LoginModel extends PageModel { }

export const LoginPage: Page<LoginModel> = (model: LoginModel) => {

    return Layout(model,
        Column(
            Form("/login",
                TextInput({ placeholder: "Username", name: "username", value: "mario@mail.com" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "123456" }),
                SubmitButton("Log in")
            ),
            Paragraph(
                "...or ", 
                Link({ href: "/register", text: "register"}), 
                " instead."
            )
        )
    )

}
