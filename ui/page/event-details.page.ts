import { PotentialUser } from "../../server/users/users.dto";
import { EventRatingForm } from "../component/event-rating-form.component";
import { EventDetails } from "../component/event-details.component";
import { Column } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";
import { Card } from "../component/card.component";
import { EventModel } from "../../server/events/event.model";

interface EventDetailsModel extends PageModel {
    user: PotentialUser;
	event: EventModel;
}

export const EventDetailsPage: Page<EventDetailsModel> = (model: EventDetailsModel) => {

    return Layout(model,
        Card(
            Column(
                EventDetails({
                    event: model.event
                }),
                EventRatingForm({ 
                    event: model.event,
                    user: model.user
                })
            )
        )
    )

}
