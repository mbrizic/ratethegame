import { roundToMidnight, now } from "./date.service";

let pageViewsPerDate: PageViewsForDate = {};

export function recordPageView(url: string) {
    const today = roundToMidnight(now())
    const dateKey = today.toISOString().substring(0, 10)

    if (pageViewsPerDate[dateKey] == null) {
        pageViewsPerDate[dateKey] = {}
    }

    const date = pageViewsPerDate[dateKey];
    
    if (date[url] == null) {
        date[url] = 1
    } else {
        date[url] = date[url] + 1
    }
}

export function getPageViewsPerDate() {
    return pageViewsPerDate
}

export function clearPageViews() {
    pageViewsPerDate = {}
}

export interface PageViewsForDate {
    [date: string]: PageViewsForUrl
}

export interface PageViewsForUrl {
    [url: string]: number
}

