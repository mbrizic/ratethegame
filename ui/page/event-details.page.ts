import { GetEventDto } from "../../server/events/events.dto";
import { PotentialUser } from "../../server/users/users.dto";
import { EventRatingForm } from "../component/event-rating-form.component";
import { EventComponent } from "../component/event.component";
import { Column } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface EventDetailsModel extends PageModel {
    user: PotentialUser;
	hasUserAlreadyRated: boolean;
	event: GetEventDto;
}

export const EventDetailsPage: Page<EventDetailsModel> = (model: EventDetailsModel) => {

    return Layout(model,
        Column(
            EventComponent(model.event),
            EventRatingForm({ 
                event: model.event,
                user: model.user,
                hasUserAlreadyRated: model.hasUserAlreadyRated
            })
        )
    )

}