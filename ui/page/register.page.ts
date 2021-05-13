import { ColumnCentered, Form, Heading2, Heading3, Link, Paragraph, PasswordInput, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Error } from '../component/error.component'
import { Layout } from "../_Layout";
import { ExecuteJs } from "../core/html.operator";
import { RegisterUserDto } from "../../server/auth/auth.dto";

interface RegisterModel extends PageModel {
  
}

export const RegisterPage: Page<RegisterModel> = (model: RegisterModel) => {

    const loginLink = Link({ href: "/login", text: "login"}, { id: "login" })

    return Layout(model,
        ColumnCentered(
            Heading3("Join us, it should be quick:"),
            Form<RegisterUserDto>("/register",
                TextInput({ placeholder: "Username", name: "email", value: "" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "" }),
                Error(model.errorMessage) as any,
                SubmitButton("Register")
            ),
            Paragraph(`... or ${loginLink} instead`, { class: "text-centered" })
        ),
        ExecuteJs(`
            const form = document.getElementsByTagName("form")[0]
            form.action = form.action + window.location.search
            let login = document.getElementById("login")
            login.href = login.href + window.location.search
        `)
    )

}
