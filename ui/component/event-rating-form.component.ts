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

	const userVote = model.event.getVoteBelongingToUser(model.user)

	if (!model.event.isVotingAllowed()) {
		return RowCentered(
			Text("You will be able to vote once the event has begun.")
		)
	}

	if (userVote) {
		const icon = userVote.wouldRecommend ? '👍' : '👎'

		return Form<RateEventCommand>(`/events/${model.event.id}/unvote`, 
			HiddenInput<RateEventCommand>({ name: "eventSlug", value: model.event.slug }),
			SubmitButton(`Remove your ${icon} vote`)
		)
	}

    return RowCentered(
        Form<RateEventCommand>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: true }),
			HiddenInput({ name: "eventSlug", value: model.event.slug }),
			SubmitButton(`Would recommend 👍`)
		),
		Form<RateEventCommand>(`/events/${model.event.id}/vote`, 
			HiddenInput({ name: "wouldRecommend", value: false }),
			HiddenInput({ name: "eventSlug", value: model.event.slug }),
			SubmitButton(`Would not recommend 👎`)
		)
    )
}