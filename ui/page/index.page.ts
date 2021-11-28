import { EventModel } from "../../server/events/event.model";
import { SportModel } from "../../server/sports/sports.model";
import { EventList } from "../component/event-list.component";
import { SportList } from "../component/sport-list.component";
import { Column, Heading2, Paragraph, Strong } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Inline } from "../core/html.operator";
import { Layout } from "../_Layout";

interface IndexModel extends PageModel {
    bestRatedEvents: EventModel[];
    eventsFromThisWeek: EventModel[];
    upcomingEvents: EventModel[];
    sports: SportModel[];
}

export const IndexPage: Page<IndexModel> = (model: IndexModel) => {

    const disclaimer = model.user === null
        ? Inline(
            Paragraph("Want to find out if last night's game is worth watching today, but don't want to Google it to save yourselves from any spoilers?", { class: "text-centered" }),
            Paragraph(`This website is a ${Strong("spoiler-free")} zone to find it out.`, { class: "text-centered" }),
        ) : null

    return Layout(model,
        Column(
            disclaimer,
            model.bestRatedEvents.length > 0
                ? Inline(
                    Heading2("Check out best recent events"),
                    EventList(model.bestRatedEvents),
                ) : null,
            model.eventsFromThisWeek.length > 0
                ? Inline(
                    Heading2("Rate events from this week"),
                    EventList(model.eventsFromThisWeek),
                ) : null,
            model.upcomingEvents.length > 0
                ? Inline(
                    Heading2("Or get hyped for upcoming ones"),
                    EventList(model.upcomingEvents),
                ) : null,

            Heading2("Check out games by sport:"),
            SportList(model.sports),
        )
    )

}
