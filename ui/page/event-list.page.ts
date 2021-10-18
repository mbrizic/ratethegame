import { EventModel } from "../../server/events/event.model";
import { EventList } from "../component/event-list.component";
import { Column, Heading2 } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface EventListModel extends PageModel {
    upcomingEvents: EventModel[];
    bestRatedEvents: EventModel[];
}

export const EventListPage: Page<EventListModel> = (model: EventListModel) => {

    return Layout(model,
        Column(
            Heading2("Check best rated events:"),
            EventList(model.bestRatedEvents),
            Heading2("Or get hyped for upcoming ones:"),
            EventList(model.upcomingEvents),
        )
    )

}
