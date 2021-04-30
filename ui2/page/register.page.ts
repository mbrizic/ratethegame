import { Column, Form, Heading1, Heading2, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface RegisterModel extends PageModel {
  
}

export const RegisterPage: Page<RegisterModel> = (model: RegisterModel) => {

    return Layout(model,
        Column(
            Form("/register",
                TextInput({ placeholder: "Username", name: "username", value: "mario@mail.com" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "123456" }),
                SubmitButton("Register")
            ),
            Paragraph(
                "...or ", 
                Link({ href: "/login", text: "login"}), 
                " instead."
            )
        )
    )

}
