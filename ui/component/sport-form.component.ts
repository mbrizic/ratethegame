import { CreateSportDto } from "../../server/sports/sports.dto"
import { PotentialUser } from "../../server/users/users.dto"
import { Column, Form, Heading3, Paragraph, SubmitButton, TextInput } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

interface SportFormModel {
    user: PotentialUser;
}

export const SportForm: Component<SportFormModel> = (model: SportFormModel) => {

    if (model.user == null) {
        return Paragraph("You need to be logged in to create sport.")
    }

    return Column(
        Heading3("Add new sport: "),
        Form<CreateSportDto>("/sports",
            TextInput({ placeholder: "Name", name: "name" }),
            TextInput({ placeholder: "Description", name: "description" }),
            SubmitButton("Add sport")
        )
    )
}