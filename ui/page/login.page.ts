import { ColumnCentered, Form, Link, Paragraph, PasswordInput, Script, SubmitButton, TextInput } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";
import { Error } from '../component/error.component'
import { ExecuteJs } from "../core/html.operator";
import { LoginUserDto } from "../../server/auth/auth.dto";

interface LoginModel extends PageModel { }

export const LoginPage: Page<LoginModel> = (model: LoginModel) => {

    const registerLink = Link({ href: "/register", text: "register" }, { id: "register" });

    return Layout(model,
        ColumnCentered(
            Form<LoginUserDto>("/login",
                TextInput({ placeholder: "Username", name: "email", value: "mario@mail.com" }),
                PasswordInput({ placeholder: "Password", name: "password", value: "123456" }),
                Error(model.errorMessage),
                SubmitButton("Log in"),
            ),
            Paragraph(`... or ${registerLink} instead`)
        ),
        ExecuteJs(`
            const form = document.getElementsByTagName("form")[0]
            form.action = form.action + window.location.search
            let register = document.getElementById("register")
            register.href = register.href + window.location.search
        `)
    )

}
