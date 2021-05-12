import { GetEventDto } from "../../server/events/events.dto"
import { PotentialUser } from "../../server/users/users.dto"
import { Form, HiddenInput, RowCentered, SubmitButton } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

interface EventFormModel {
    user: PotentialUser;
	hasUserAlreadyRated: boolean;
	event: GetEventDto;
}

export const EventRatingForm: Component<EventFormModel> = (model: EventFormModel) => {

    const userId = model.user ? model.user.id : -1;

	if (model.hasUserAlreadyRated) {
		return Form(`/events/${model.event.id}/unvote`, 
			HiddenInput({ name: "eventId", value: model.event.id }),
			HiddenInput({ name: "userId", value: userId }),
			SubmitButton("Remove your vote")
		)
	}

    return RowCentered(
        Form(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: true }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			HiddenInput({ name: "userId", value: userId }),
			SubmitButton("Would recommend 👍")
		),
		Form(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: false }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			HiddenInput({ name: "userId", value: userId }),
			SubmitButton("Would not recommend 👎")
		)
    )
}