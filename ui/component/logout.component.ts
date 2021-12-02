import { returnUrlQueryParam } from "../../server/core/constants"
import { Form, Link, SubmitButton, SubmitLink } from "../core/html.elements"
import { SimpleComponent } from "../core/html.interfaces"
import { ExecuteJs, Inline } from "../core/html.operator"

export const Logout: SimpleComponent = () => {
    return Inline(
        Link({ text: "Logout", href: "/logout" }),
        ExecuteJs(`
            let form = document.querySelectorAll("form[action*='/logout']")[0]
            form.action = form.action + "?${returnUrlQueryParam}=" + window.location.pathname
        `)
    )
    
}