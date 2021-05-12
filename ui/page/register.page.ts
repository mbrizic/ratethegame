import { ColumnCentered, Form, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Error } from '../component/error.component'
import { Layout } from "../_Layout";
import { ExecuteJs } from "../core/html.operator";

interface RegisterModel extends PageModel {
  
}

export const RegisterPage: Page<RegisterModel> = (model: RegisterModel) => {

    const loginLink = Link({ href: "/login", text: "login"}, { id: "login" })

    return Layout(model,
        ColumnCentered(
            Form("/register",
                TextInput({ placeholder: "Username", name: "username", value: "" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "" }),
                Error(model.errorMessage),
                SubmitButton("Register")
            ),
            Paragraph(`... or ${loginLink} instead`)
        ),
        ExecuteJs(`
            const form = document.getElementsByTagName("form")[0]
            form.action = form.action + window.location.search
            let login = document.getElementById("login")
            login.href = login.href + window.location.search
        `)
    )

}
