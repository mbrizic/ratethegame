import { GetEventDto, RateEventDto } from "../../server/events/events.dto"
import { PotentialUser } from "../../server/users/users.dto"
import { Form, HiddenInput, RowCentered, SubmitButton, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"

interface EventFormModel {
    user: PotentialUser;
	isVotingAllowed: boolean;
	hasUserAlreadyRated: boolean;
	event: GetEventDto;
}

export const EventRatingForm: Component<EventFormModel> = (model: EventFormModel) => {

	if (!model.isVotingAllowed) {
		return RowCentered(
			Text("You will be able to vote once the event voting period begins for this event.")
		)
	}

	if (model.hasUserAlreadyRated) {
		return Form<RateEventDto>(`/events/${model.event.id}/unvote`, 
			HiddenInput<RateEventDto>({ name: "eventId", value: model.event.id }),
			SubmitButton("Remove your vote")
		)
	}

    return RowCentered(
        Form<RateEventDto>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: true }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			SubmitButton("Would recommend 👍")
		),
		Form<RateEventDto>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: false }),
			HiddenInput({ name: "eventId", value: model.event.id }),
			SubmitButton("Would not recommend 👎")
		)
    )
}