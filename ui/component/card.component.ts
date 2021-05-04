import { Div, Form, SubmitButton } from "../core/html.elements"
import { Component, SimpleComponent } from "../core/html.interfaces"

export const Card: Component<string> = (children: string) => {
    return Div(children, {
        class: "card"
    })
}