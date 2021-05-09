import { PageViewsForDate } from "../../server/core/pageview.service";
import { GetEventDto } from "../../server/events/events.dto";
import { GetUserDto } from "../../server/users/users.dto";
import { Column, Heading2, Heading3, Heading4, ListItem, Paragraph, Row, UnorderedList } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface StatsModel extends PageModel {
    users: GetUserDto[];
    events: GetEventDto[];
    pageviews: PageViewsForDate;
}

export const StatsPage: Page<StatsModel> = (model: StatsModel) => {

    const mapped = Object.entries(model.pageviews)

    return Layout(model,
        Column(
            Heading2("Stats page"),
            Heading3(`Users (${model.users.length}):`),
            UnorderedList(
                ...model.users.map(user => ListItem(user.email)),
            ),
            Heading3(`Events (${model.events.length}):`),
            UnorderedList(
                ...model.events.map(event => ListItem(event.name)),
            ),
            Heading3(`Pageviews:`),
            ...mapped.map(([date, pageviews]) => Column(
                Heading4(date),
                UnorderedList(
                    ...Object.entries(pageviews).map(([url, count]) =>
                        ListItem(`${url}: ${count}`)
                    )
                )
            )),
        )
    )
}
