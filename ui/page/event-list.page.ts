import { EventModel } from "../../server/events/event.model";
import { EventList } from "../component/event-list.components";
import { Column, Heading2 } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Inline } from "../core/html.operator";
import { Layout } from "../_Layout";

interface EventListModel extends PageModel {
    bestRatedEvents: EventModel[];
    eventsFromThisWeek: EventModel[];
    upcomingEvents: EventModel[];
}

export const EventListPage: Page<EventListModel> = (model: EventListModel) => {

    return Layout(model,
        Column(
            Heading2("Top-rated:"),
            EventList(model.bestRatedEvents),

            model.eventsFromThisWeek.length > 0
                ? Inline(
                    Heading2("Recent:"),
                    EventList(model.eventsFromThisWeek),
                ) : null,

            model.upcomingEvents.length > 0
                ? Inline(
                    Heading2("Upcoming:"),
                    EventList(model.upcomingEvents),
                ) : null,
        )
    )

}
