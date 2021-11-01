export const secondInMs = 1000
export const minuteInMs = secondInMs * 60
export const hourInMs = minuteInMs * 60
export const dayInMs = hourInMs * 24
export const twoDaysInMs = dayInMs * 2
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
            return "In few years"
        } else if (timeDiff > monthInMs) {
            return "In few months"
        } else if (timeDiff > weekInMs) {
            return "In few weeks"
        } else if (timeDiff > dayInMs) {
            return `In ${getDaysLabelWithTime(timeDiff)}`
        } else if (timeDiff > hourInMs) {
            return `In ${getHoursAndMinutesLabel(timeDiff)}`
        } else if (timeDiff > minuteInMs) {
            return `In ${getDiffInMinutes(timeDiff)} minutes`
        } else {
            return "Sometime in the future"
        }
    }

    if (timeDiff < minuteInMs) {
        return "Just started"
    } else if (timeDiff < hourInMs) {
        return `Started ${getDiffInMinutes(timeDiff)} minutes ago`
    } else if (timeDiff < dayInMs) {
        return `Started ${getHoursAndMinutesLabel(timeDiff)} ago`
    } else if (timeDiff < twoDaysInMs) {
        return "Yesterday"
    } else if (timeDiff < weekInMs) {
        return `${getDaysLabel(timeDiff)} ago`
    } else if (timeDiff < monthInMs) {
        return "More than a week ago"
    } else if (timeDiff < yearInMs) {
        return "More than a month ago"
    } else {
        return "More than a year ago"
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
    let millisecondsToAdd = 0

    if(options.seconds) {
        millisecondsToAdd += options.seconds * secondInMs
    }

    if(options.minutes) {
        millisecondsToAdd += options.minutes * minuteInMs
    }

    if(options.hours) {
        millisecondsToAdd += options.hours * hourInMs
    }

    if(options.days) {
        millisecondsToAdd += options.days * dayInMs
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

function getDaysLabelWithTime(diffInMs: number) {
    const diffInMinutes = diffInMs / 1000 / 60
    const diffInHours = Math.floor(diffInMinutes / 60)

    const days = Math.floor(diffInHours / 24)
    const hours = Math.floor(diffInHours - (days * 24))
    const minutes = Math.floor(diffInMinutes - (hours * 60) - (days * 24 * 60))

    return `${days} days, ${hours} hours and ${minutes} minutes`
}

function getDaysLabel(diffInMs: number) {
    const diffInMinutes = diffInMs / 1000 / 60
    const days = Math.floor(diffInMinutes / 60 / 24)

    return `${days} days`
}

function getDiffInMinutes(diffInMs: number) {
    return Math.round(diffInMs / 1000 / 60)
}

function getHoursAndMinutesLabel(diffInMs: number) {
    const diffInMinutes = Math.round(diffInMs / 1000 / 60)
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = Math.floor(diffInMinutes - (hours * 60))

    return minutes == 0
        ? `exactly ${hours} hours`
        : `${hours} hours and ${minutes} minutes`
}

function pad(number: number) {
    if (number.toString().length == 1) {
        return `0${number}`
    } {
        return number
    }
}

interface AddDateOptions {
    seconds?: number
    minutes?: number
    hours?: number
    days?: number
}