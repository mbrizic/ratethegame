import { PotentialUser } from "../../server/users/users.dto"
import { Column, Div, Paragraph } from "../core/html.elements"

export const AdminOnlyArea = (user: PotentialUser, ...children: string[]) => {

    if (user?.isAdmin) {
        return Div(
            Column(
                children.join(""),
                Paragraph("Admin only area."),
            ),
            { class: "admin" }
        )
    }

    return null
}