import { userInfo } from "os"
import { PotentialUser } from "../../server/users/users.dto"
import { Column, Form, Heading3, HiddenInput, Paragraph, SubmitButton, TextInput } from "../core/html.elements"
import { Component, SimpleComponent } from "../core/html.interfaces"

interface SportFormModel {
    user: PotentialUser;
}

export const SportForm: Component<SportFormModel> = (model: SportFormModel) => {

    if (model.user == null) {
        return Paragraph("You need to be logged in to create sport.")
    }

    return Column(
        Heading3("Add new sport: "),
        Form("/sports",
            TextInput({ placeholder: "Name", name: "name" }),
            TextInput({ placeholder: "Description", name: "description" }),
            HiddenInput({ name: "userId", value: model.user.id }),
            SubmitButton("Add event")
        )
    )
}