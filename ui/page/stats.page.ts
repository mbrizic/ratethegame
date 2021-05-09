import { GetEventDto } from "../../server/events/events.dto";
import { GetUserDto } from "../../server/users/users.dto";
import { Column, Heading2, Heading3, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface StatsModel extends PageModel {
    users: GetUserDto[];
    events: GetEventDto[];
}

export const StatsPage: Page<StatsModel> = (model: StatsModel) => {

    return Layout(model,
        Column(
            Heading2("Stats page"),
            Heading3(`Users (${model.users.length}):`),
            ...model.users.map(user => Paragraph(user.email)),
            Heading3(`Events (${model.events.length}):`),
        )
    )

}
