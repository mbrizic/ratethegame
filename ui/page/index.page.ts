import { GetEventDto } from "../../server/events/events.dto";
import { GetSportDto } from "../../server/sports/sports.dto";
import { EventList } from "../component/event-list.component";
import { SportList } from "../component/sport-list.component";
import { Column, Heading2, Paragraph, Strong } from "../core/html.elements";
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
            Heading2("Check out best recent events"),
            EventList(model.bestRatedEvents),
            Heading2("Or get hyped for upcoming ones"),
            EventList(model.upcomingEvents),
            Heading2("Check out games by sport:"),
            SportList(model.sports),
        )
    )

}
