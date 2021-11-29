import { ChildElement, Div, Form, SubmitButton } from "../core/html.elements"
import { Component, SimpleComponent } from "../core/html.interfaces"

export const Card: Component<ChildElement> = (children: ChildElement) => {
    return Div(children, {
        class: "card"
    })
}

export const DimmedCard: Component<ChildElement> = (children: ChildElement) => {
    return Div(children, {
        class: "dimmed card"
    })
}