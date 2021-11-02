import { returnUrlQueryParam } from "../../server/core/constants"
import { Form, SubmitButton, SubmitLink } from "../core/html.elements"
import { SimpleComponent } from "../core/html.interfaces"
import { ExecuteJs, Inline } from "../core/html.operator"

export const Logout: SimpleComponent = () => {
    return Inline(
        Form(`/logout`,
            SubmitLink("Log out")
        ),
        ExecuteJs(`
            let form = document.querySelectorAll("form[action*='/logout']")[0]
            form.action = form.action + "?${returnUrlQueryParam}=" + window.location.pathname
        `)
    )
    
}