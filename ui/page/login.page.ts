import { ColumnCentered, Form, Heading3, Link, Paragraph, PasswordInput, Script, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'
import { ExecuteJs } from "../core/html.operator";
import { LoginUserCommand } from "../../server/auth/auth.dto";
import { getAppConfig } from "../../server/core/app.config";

interface LoginModel extends PageModel { }

export const LoginPage: Page<LoginModel> = (model: LoginModel) => {

    const username = getAppConfig().isDebugMode ? "mario@mail.com" : ""
    const password = getAppConfig().isDebugMode ? "123456" : ""

    const registerLink = Link({ href: "/register", text: "register" }, { id: "register" });

    return Layout(model,
        ColumnCentered(
            Heading3("Already been here? Sign in:"),
            Form<LoginUserCommand>("/login",
                TextInput({ placeholder: "Username", name: "email", value: username }),
                PasswordInput({ placeholder: "Password", name: "password", value: password }),
                Error(model.errorMessage),
                SubmitButton("Log in"),
            ),
            Paragraph(`... or ${registerLink} instead`, { class: "text-centered" })
        ),
        ExecuteJs(`
            const form = document.getElementsByTagName("form")[0]
            form.action = form.action + window.location.search
            let register = document.getElementById("register")
            register.href = register.href + window.location.search
        `)
    )

}
