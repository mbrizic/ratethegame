import { Div } from "../core/html.elements"

export const Error = (error: string | null | undefined) => {

    if (error == null) {
        return null
    }

    return Div(
        error,
        { class: "text-danger text-centered" }
    )

}