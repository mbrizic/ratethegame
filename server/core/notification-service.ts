import { LineBreak, Link } from "../../ui/core/html.elements"
import { EventModel } from "../events/event.model"
import EventsService from "../events/events.service"
import UserService from "../users/users.service"
import { getAppConfig } from "./app.config"
import { sendEmail } from "./mail.service"

export default class NotificationService {
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
        const now = Date.now();
        const users = await this.userService.getAll()
        const events = await this.eventsService.getAllEvents()

        var relevantEvents = events.filter(event => this.betweenHoursAgo(now, event.date.valueOf(), 6.01, 5)).filter(event => event.isRatedFavourably)

        // TODO optimization: group relevantEvents by sportId

        for (var user of users) {
            if (! user.settings.getReceiveTopRatedNotificationsSetting().value) 
            {
                continue
            }

            var userRelevantEvents = relevantEvents.filter(event => user.subscriptions.some(sub => sub.sportId === event.sportId))
            var hostname = getAppConfig().hostname

            if (userRelevantEvents.length == 0) 
            {
                continue
            }

            if (getAppConfig().isDebugMode) {
                console.log(
                    this.generateNotificationText(userRelevantEvents, hostname)
                )

                continue
            }

            sendEmail(user.email, 'Recent Top rated events', 'Events:', 
                this.generateNotificationText(userRelevantEvents, hostname)
            )
        }
    }
}
