import { GetEventDto } from "../../server/events/events.dto";
import { GetSportDto } from "../../server/sports/sports.dto";
import { AdminOnlyArea } from "../component/admin-area.component";
import { EventList } from "../component/event-list.component";
import { SportForm } from "../component/sport-form.component";
import { SportList } from "../component/sport-list.component";
import { Column, Heading1, Heading2, Paragraph, Row, RowSpaced, Strong } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface IndexModel extends PageModel {
    bestRatedEvents: GetEventDto[];
    upcomingEvents: GetEventDto[];
    sports: GetSportDto[];
}

export const IndexPage: Page<IndexModel> = (model: IndexModel) => {

    return Layout(model,
        Column(
            Paragraph("Want to find out if last night's game is worth watching today, but don't want to Google it to save yourselves from any spoilers?", { class: "text-centered" }),
            Paragraph(`This website is a ${Strong("spoiler-free")} zone to find it out.`, { class: "text-centered" }),
            Heading2("Check out most interesting events"),
            EventList(model.bestRatedEvents),
            Heading2("Or get hyped for upcoming ones"),
            EventList(model.upcomingEvents),
            Heading2("Check out games by sport:"),
            SportList(model.sports),
            AdminOnlyArea(
                model.user,
                SportForm({ user: model.user })
            )
        )
    )

}
