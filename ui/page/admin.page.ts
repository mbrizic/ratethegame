import { AnalyticsEvent } from "../../server/core/analytics-event.service";
import { AppSettings } from "../../server/core/app.settings";
import { CacheStats } from "../../server/core/cache/cache.service";
import { RecordedError } from "../../server/core/error.service";
import { PageViewsForDate } from "../../server/core/pageview.service";
import { EventModel } from "../../server/events/event.model";
import { Column, Form, Heading2, Heading3, Heading4, HiddenInput, ListItem, Paragraph, Row, RowSpaced, SubmitButton, UnorderedList } from "../core/html.elements";
import { UserModel } from "../../server/users/users.model";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface StatsModel extends PageModel {
    users: UserModel[]
    events: EventModel[]
    totalNumberOfVotes: number
    percentageOfPositiveVotes: number
    pageviews: PageViewsForDate
    recordedErrors: RecordedError[]
    analyticsEvents: AnalyticsEvent[],
    cacheStats: CacheStats
    appSettings: AppSettings
}

export const AdminPage: Page<StatsModel> = (model: StatsModel) => {

    const mapped = Object.entries(model.pageviews)

    return Layout(model,
        Column(
            Heading2("Stats page"),
            RowSpaced(
                Column(
                    Heading3(`Users (${model.users.length}):`),
                    UnorderedList(
                        ...model.users.map(user => ListItem(user.email)),
                    ),
                ),
                Column(
                    Heading3(`Events (${model.events.length}):`),
                    UnorderedList(
                        ...model.events.map(event => ListItem(event.name)),
                    ),
                )
            ),
            RowSpaced(
                Column(
                    Heading3(`Users' subscriptions:`),
                    UnorderedList(
                        ...model.users.map(user => ListItem(
                            `${user.email} (${user.subscriptions.length}) > ${user.subscriptions.map(subscription => ` ${subscription.sportName}`)}`
                        )),
                    ),
                )
            ),
            RowSpaced(
                Column(
                    Heading3(`Users' settings:`),
                    UnorderedList(
                        ...model.users.map(user => ListItem(
                            `${user.email} > ${user.settings.getSettings().map(setting => ` ${setting.columnName}=${setting.value}`)}`
                        )),
                    ),
                )
            ),
            RowSpaced(
                Column(
                    Heading3(`Errors (${model.recordedErrors.length}): `),
                    Form("/admin/errors/clear",
                        SubmitButton("Clear all errors")
                    ),
                    UnorderedList(
                        ...model.recordedErrors.map(err =>
                            ListItem(`${err.timestamp.toISOString()} - ${err.errorStatus} - ${err.errorMessage}`)
                        )
                    ),
                ),
                Column(
                    Heading3(`Analytics (${model.analyticsEvents.length}): `),
                    Form("/admin/analytics/clear",
                        SubmitButton("Clear analytics events")
                    ),
                    UnorderedList(
                        ...model.analyticsEvents.map(event =>
                            ListItem(`
                                ${event.timestamp.toISOString()} - 
                                ${event.type}, user ${event.userId} 
                                ${event.relatedEntityId ? `on ID ${event.relatedEntityId}` : ''}
                                ${event.additionalMetadata ? `with ${event.additionalMetadata}` : ''}
                            `)
                        )
                    ),
                )
            ),
            RowSpaced(
                Column(
                    Heading3(`Pageviews:`),
                    Form("/admin/pageviews/clear",
                        SubmitButton("Clear pageviews")
                    ),
                    ...mapped.map(([date, pageviews]) => Column(
                        Heading4(date),
                        UnorderedList(
                            ...Object.entries(pageviews).map(([url, count]) =>
                                ListItem(`${url}: ${count}`)
                            )
                        )
                    )),
                ),
                Column(
                    Heading3(`Event rating stats:`),
                    UnorderedList(
                        ListItem(`${model.totalNumberOfVotes} votes in total`),
                        ListItem(`${model.percentageOfPositiveVotes}% positive`),
                    ),
                    Heading3(`Cache stats:`),
                    UnorderedList(
                        ListItem(`${model.cacheStats.cacheHits} hits, ${model.cacheStats.cacheMisses} misses`),
                    ),
                ),
            ),
            Heading3("Actions: "),
            Row(
                Form("/admin/css-cache/clear",
                    SubmitButton("Clear css cache")
                ),
                Form("/admin/event-cache/clear",
                    SubmitButton("Clear events cache")
                ),
                Form("/admin/sport-cache/clear",
                    SubmitButton("Clear sports cache")
                ),
                Form("/admin/user-cache/clear",
                    SubmitButton("Clear users cache")
                ),
                Form("/admin/all-caches/clear",
                    SubmitButton("Purge all caches")
                ),
            ),
            Heading3("App settings: "),
            Row(
                UnorderedList(
                    ...Object.keys(model.appSettings).map((appSetting: keyof AppSettings) =>
                        ListItem(
                            Row(
                                Form<AppSettings>("/admin/app-settings",
                                    HiddenInput({
                                        name: "areOptimizationHacksEnabled",
                                        value: appSetting === "areOptimizationHacksEnabled"
                                            ? !model.appSettings.areOptimizationHacksEnabled
                                            : model.appSettings.areOptimizationHacksEnabled
                                    }),
                                    HiddenInput({
                                        name: "isCacheEnabled",
                                        value: appSetting === "isCacheEnabled"
                                            ? !model.appSettings.isCacheEnabled
                                            : model.appSettings.isCacheEnabled
                                    }),
                                    SubmitButton(model.appSettings[appSetting]
                                        ? 'Disable'
                                        : 'Enable'
                                    )
                                ),
                                Paragraph(`${appSetting} - ${model.appSettings[appSetting]}`),
                            ),
                        )
                    )
                )
            )

        )
    )
}
