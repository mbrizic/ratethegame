import EventsService from "../events/events.service"
import UserService from "../users/users.service"

export default class NotificationService {
    private userService = new UserService()
    private eventsService = new EventsService()

    private betweenHoursAgo = (now: number, date: number, hoursLower: number, hoursUpper: number) => {
        const lower = now - 1000 * 60 * 60 * hoursLower;
        const upper = now - 1000 * 60 * 60 * hoursUpper;
    
        return (lower < date) && (date <= upper)
    }
    
    public async sendTopRatedEvents() {
        const now = Date.now();
        const users = await this.userService.getAll()
        const events = await this.eventsService.getAllEvents()

        // TODO extract all relevant events per sport
        var relevantEvents = events.filter(event => this.betweenHoursAgo(now, event.date.getMilliseconds(), 6.01, 5)).filter(event => event.isRatedFavourably)

        var groupedRelevantEvents = events.groupBy

        for (var user of users) {
            // TODO send each user that is subscribet to the sport in question the relevant sport's events
        }
    }
}
