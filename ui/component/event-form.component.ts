import { roundToNextHour, toDatePickerFormat } from "../../server/core/date.service"
import { CreateEventCommand } from "../../server/events/events.dto"
import { PotentialUser } from "../../server/users/users.dto"
import { Column, DateInput, Form, Heading3, HiddenInput, Paragraph, SubmitButton, TextInput } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

interface EventFormModel {
    user: PotentialUser;
    sportId: number | undefined;
}

export const EventForm: Component<EventFormModel> = (model: EventFormModel) => {
    if (model.sportId == null) {
        return null;
    }

    const date = toDatePickerFormat(
        roundToNextHour(
            new Date()
        )
    )

    if (model.user == null) {
        return Paragraph("You need to be logged in to create an event.")
    }

    return Column(
        Heading3("Add new event: "),
        Form<CreateEventCommand>("/events",
            TextInput({ placeholder: "Name", name: "name" }),
            TextInput({ placeholder: "Description", name: "description" }),
            TextInput({ placeholder: "URL slug (optional)", name: "slug" }),
            DateInput({ placeholder: "", name: "date", value: date }),
            HiddenInput({ name: "sportId", value: model.sportId }),
            SubmitButton("Add event")
        )
    )
}