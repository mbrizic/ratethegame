import { GetEventDto } from "../../server/events/events.dto";
import { PotentialUser } from "../../server/users/users.dto";
import { EventRatingForm } from "../component/event-rating-form.component";
import { EventDetails } from "../component/event-details.component";
import { Column } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";
import { Card } from "../component/card.component";

interface EventDetailsModel extends PageModel {
    user: PotentialUser;
	hasUserAlreadyRated: boolean;
    isVotingPeriod: boolean;
	event: GetEventDto;
}

export const EventDetailsPage: Page<EventDetailsModel> = (model: EventDetailsModel) => {

    return Layout(model,
        Card(
            Column(
                EventDetails({
                    event: model.event,
                    isVotingPeriod: model.isVotingPeriod
                }),
                EventRatingForm({ 
                    event: model.event,
                    user: model.user,
                    hasUserAlreadyRated: model.hasUserAlreadyRated,
                    isVotingPeriod: model.isVotingPeriod
                })
            )
        )
    )

}
