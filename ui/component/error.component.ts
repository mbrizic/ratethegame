import { Div } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

export const Error: Component<string> = (error: string | null) => {

    if (error == null) {
        return null
    }

    return Div(
        error,
        { class: "text-danger text-centered" }
    )

}