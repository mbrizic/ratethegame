import { LineBreak, Link } from "../../ui/core/html.elements"
import { EventModel } from "../events/event.model"
import EventsService from "../events/events.service"
import UserService from "../users/users.service"
import { getAppConfig } from "../core/app.config"
import { sendEmail } from "../core/mail.service"

export default class NotificationsService {
    private userService = new UserService()
    private eventsService = new EventsService()

    private betweenHoursAgo = (now: number, date: number, hoursLower: number, hoursUpper: number) => {
        const lower = now - 1000 * 60 * 60 * hoursLower;
        const upper = now - 1000 * 60 * 60 * hoursUpper;
    
        return (lower < date) && (date <= upper)
    }

    private generateNotificationText = (userRelevantEvents: EventModel[], hostname: string) => {
        return userRelevantEvents.map(event => `${event.name} - ${Link({
            text: "Link to event",
            href: `${hostname}/events/${event.slug}`
        })} ${LineBreak()} `).join("")
    }
    
    public async sendTopRatedEvents() {
        var coeff = 1000 * 60 * 1;
        const now = Math.round(Date.now() / coeff) * coeff  // current timestamp rounded to nearest minute
        const users = await this.userService.getAll()
        const events = await this.eventsService.getAllEvents()
        const hostname = getAppConfig().hostname

        var relevantEvents = events.filter(event => 
                this.betweenHoursAgo(now, event.date.valueOf(), 6, 5)
            ).filter(
                event => event.isRatedFavourably
            )

        // TODO optimization: group relevantEvents by sportId

        for (var user of users) {
            if (! user.settings.getReceiveTopRatedNotificationsSetting().value) 
            {
                continue
            }

            var userRelevantEvents = relevantEvents.filter(event => user.subscriptions.some(sub => sub.sportId === event.sportId))

            if (userRelevantEvents.length == 0) 
            {
                continue
            }

            if (getAppConfig().isDebugMode) {
                console.log(
                    this.generateNotificationText(userRelevantEvents, hostname)
                )
                console.log(
                    user.getUnsubscribeLink()
                )

                continue
            }

            sendEmail(user.email, 'Recent Top rated events', 'Events:', 
                this.generateNotificationText(userRelevantEvents, hostname),
                hostname,
                user.getUnsubscribeLink()
            )
        }
    }
}
