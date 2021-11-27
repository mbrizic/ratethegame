import { Column, Heading2, Heading3, Link, Paragraph, Row, RowSpaced, Text } from "../core/html.elements"
import { Component } from "../core/html.interfaces"
import { Card } from "./card.component"
import { orderByDescending } from "../../server/core/util"
import { SportModel } from "../../server/sports/sports.model"
import { UserModel } from "../../server/users/users.model"
import { SportSubscribeComponent } from "./sport-subscribe.component"

interface SportComponentModel {
    sport: SportModel;
    userData?: UserModel | undefined;
}

export const SportComponent: Component<SportComponentModel> = (model: SportComponentModel) => {

    const totalEvents = model.sport.events.length
    const bestRatedEvent = orderByDescending(model.sport.events, e => e.ratingPercentage)[0]

    const bestRatedEventLink = bestRatedEvent != null 
        ? Link({ href: `/events/${bestRatedEvent.id}`, text: bestRatedEvent.name})
        : null

    return Card(
        RowSpaced(
            Column(
                Heading3(
                    Link({text: model.sport.name, href: `/sports/${model.sport.id}`})
                ),
                totalEvents 
                    ? Text(`Has ${totalEvents} events. `) 
                    : Text(`No events yet for this one.`),
                bestRatedEvent && bestRatedEvent.totalRatings > 0
                    ? Text(`Best rated one so far is ${bestRatedEventLink} with ${bestRatedEvent.totalRatings} votes and a score of ${bestRatedEvent.ratingPercentage}%`)
                    : null
            ),
            model.userData
                ? SportSubscribeComponent({
                      user: model.userData,
                      sportId: model.sport.id!,
                  })
                : null
        )
    )

}