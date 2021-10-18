import { RateEventCommand } from "../../server/events/events.dto"
import { EventModel } from "../../server/events/event.model"
import { PotentialUser } from "../../server/users/users.dto"
import { Form, HiddenInput, RowCentered, SubmitButton, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

interface EventFormModel {
    user: PotentialUser;
	event: EventModel;
}

export const EventRatingForm: Component<EventFormModel> = (model: EventFormModel) => {

	if (!model.event.isVotingAllowed()) {
		return RowCentered(
			Text("You will be able to vote once the event has begun.")
		)
	}

	if (model.event.isRatedByCurrentlyLoggedInUser) {
		return Form<RateEventCommand>(`/events/${model.event.id}/unvote`, 
			HiddenInput<RateEventCommand>({ name: "eventId", value: model.event.id }),
			SubmitButton("Remove your vote")
		)
	}

    return RowCentered(
        Form<RateEventCommand>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: true }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			SubmitButton("Would recommend 👍")
		),
		Form<RateEventCommand>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: false }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			SubmitButton("Would not recommend 👎")
		)
    )
}