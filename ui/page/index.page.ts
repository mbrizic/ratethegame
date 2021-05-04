import { GetEventDto } from "../../server/events/events.dto";
import { GetSportDto } from "../../server/sports/sports.dto";
import { EventList } from "../component/event-list.component";
import { SportForm } from "../component/sport-form.component";
import { SportList } from "../component/sport-list.component";
import { Column, Heading1, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface IndexModel extends PageModel {
    events: GetEventDto[];
    sports: GetSportDto[];
}

export const IndexPage: Page<IndexModel> = (model: IndexModel) => {

    return Layout(model,
        Column(
            Paragraph("What's this website about? Add some description here", { class: "text-centered" }),
            Heading2("List of all sports"),
            SportList(model.sports),
            Heading2("Here's the list of all events"),
            EventList(model.events),
            SportForm({ user: model.user })
        )
    )

}
