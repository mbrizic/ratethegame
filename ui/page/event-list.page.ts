import { GetEventDto } from "../../server/events/events.dto";
import { EventList } from "../component/event-list.component";
import { Column, Heading2 } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface EventListModel extends PageModel {
    events: GetEventDto[];
}

export const EventListPage: Page<EventListModel> = (model: EventListModel) => {

    return Layout(model,
        Column(
            Heading2("List of all events"),
            EventList(model.events)
        )
    )

}
