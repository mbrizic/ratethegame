import { RecordedError } from "../../server/core/error.service";
import { PageViewsForDate } from "../../server/core/pageview.service";
import { EventModel } from "../../server/events/event.model";
import { UserModel } from "../../server/users/users.model";
import { Column, Form, Heading2, Heading3, Heading4, ListItem, Row, SubmitButton, UnorderedList } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface StatsModel extends PageModel {
    users: UserModel[];
    events: EventModel[];
    pageviews: PageViewsForDate;
    recordedErrors: RecordedError[];
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
            Heading3(`Errors (${model.recordedErrors.length}): `),
            UnorderedList(
                ...model.recordedErrors.map(err => 
                    ListItem(`${err.timestamp.toISOString()} - ${err.errorStatus} - ${err.errorMessage}`)
                )
            ),
            Heading3("Actions: "),
            Row(
                Form("/admin/errors/clear",
                    SubmitButton("Clear all errors")
                ),
                Form("/admin/pageviews/clear",
                    SubmitButton("Clear pageviews")
                ),
                Form("/admin/css-cache/clear", 
                    SubmitButton("Clear css cache")
                ),
            )
            
        )
    )
}
