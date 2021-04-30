import { Form, SubmitButton } from "../core/html.elements"
import { SimpleComponent } from "../core/html.interfaces"

export const Logout: SimpleComponent = () => {

    return Form("/logout",
        SubmitButton("Log out")
    )

}