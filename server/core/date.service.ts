export const secondInMs = 1000
export const minuteInMs = secondInMs * 60
export const hourInMs = minuteInMs * 60
export const dayInMs = hourInMs * 24
export const weekInMs = dayInMs * 7
export const monthInMs = dayInMs * 30
export const yearInMs = monthInMs * 12

export function now() {
    return new Date()
} 

export function humanize(date: Date) {
    const now = new Date()

    let timeDiff = now.getTime() - date.getTime()

    if (timeDiff < 0) {
        timeDiff = timeDiff * -1
        if (timeDiff > yearInMs) {
            return "In few years";
        } else if (timeDiff > monthInMs) {
            return "In few months";
        } else if (timeDiff > weekInMs) {
            return "In few weeks";
        } else if (timeDiff > dayInMs) {
            const diffInDays = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
            return `In ${diffInDays} days`;
        } else if (timeDiff > hourInMs) {
            const diffInMinutes = timeDiff / 1000 / 60;
            const hoursRemaining = Math.floor(diffInMinutes / 60);
            const minutesRemmaining = Math.floor(diffInMinutes - (hoursRemaining * 60))

            if (minutesRemmaining > 0) {
                return `In ${hoursRemaining} hours and ${minutesRemmaining} minutes`
            } else {
                return `In exactly ${hoursRemaining} hours`
            }
        } else if (timeDiff > minuteInMs) {
            const diffInMinutes = Math.floor(timeDiff / 1000 / 60);
            return `In ${diffInMinutes} minutes`;
        } else {
            return "Sometime in the future";
        }
    }
    

    if (timeDiff < minuteInMs) {
        return "Few seconds ago";
    } else if (timeDiff < hourInMs) {
        return "Few minutes ago";
    } else if (timeDiff < dayInMs) {
        return "Few hours ago";
    } else if (timeDiff < weekInMs) {
        return "Few days ago";
    } else if (timeDiff < monthInMs) {
        return "Few weeks ago";
    } else if (timeDiff < yearInMs) {
        return "Few months ago";
    } else {
        return "More than a year ago";
    }
}

export function roundToNextHour(date: Date) {
    date.setHours(date.getHours() + 1)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
}

export function roundToMidnight(date: Date) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)

    return date
}

export function addToDate(date: Date, options: AddDateOptions = {}) {
    let millisecondsToAdd = 0;

    if(options.seconds) {
        millisecondsToAdd += options.seconds * secondInMs
    }

    if(options.minutes) {
        millisecondsToAdd += options.minutes * minuteInMs
    }

    if(options.hours) {
        millisecondsToAdd += options.hours * hourInMs
    }

    return new Date(date.getTime() + millisecondsToAdd)
}

export function toDatePickerFormat(date: Date) {

    const year = date.getFullYear()
    const month = pad(date.getUTCMonth() + 1)
    const day = pad(date.getUTCDate())

    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

function pad(number: number) {
    if (number.toString().length == 1) {
        return `0${number}`
    } {
        return number
    }
}

interface AddDateOptions {
    seconds?: number;
    minutes?: number;
    hours?: number;
}