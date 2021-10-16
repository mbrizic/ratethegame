import { Link } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Inline } from "../core/html.operator"

export const UserSettings: Component<number> = (userId: number) => {
    return Inline(
        Link({ text: 'Settings', href: `/user/${userId}` })
    )

}