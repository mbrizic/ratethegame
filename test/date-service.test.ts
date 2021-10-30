import { addToDate, hourInMs, humanize } from "../server/core/date.service";

test('test date humanizer works for upcoming dates', () => {
    const date = new Date();

    const futureDate1 = addToDate(date, { hours: 4 })

    expect(humanize(futureDate1)).toBe("In exactly 4 hours");

    const futureDate2 = addToDate(date, { minutes: 240, seconds: 1 })

    expect(humanize(futureDate2)).toBe("In exactly 4 hours");

    const futureDate3 = addToDate(date, { minutes: 241, seconds: 1 })

    expect(humanize(futureDate3)).toBe("In 4 hours and 1 minutes");

    const futureDate4 = addToDate(date, { hours: 5, minutes: 1, seconds: 1 })

    expect(humanize(futureDate4)).toBe("In 5 hours and 1 minutes");

    const futureDate5 = addToDate(date, { hours: 21, minutes: 1, seconds: 1 })

    expect(humanize(futureDate5)).toBe("In 21 hours and 1 minutes");

    const futureDate6 = addToDate(date, { hours: 30 })

    expect(humanize(futureDate6)).toBe("In 1 days, 6 hours and 0 minutes")

    const futureDate7 = addToDate(date, { hours: 300 })

    expect(humanize(futureDate7)).toBe("In few weeks")
});

test('test date humanizer works for past dates', () => {
    const date = new Date();

    const tenSecondsAgo = addToDate(date, { seconds: -10 })

    expect(humanize(tenSecondsAgo)).toBe("Just started");

    const tenMinutesAgo = addToDate(date, { minutes: -10, seconds: 1 })

    expect(humanize(tenMinutesAgo)).toBe("Started 10 minutes ago");

    const threeHoursAgo = addToDate(date, { hours: -3, seconds: 1 })

    expect(humanize(threeHoursAgo)).toBe("Started exactly 3 hours ago");

    const date4 = addToDate(date, { hours: -3, minutes: -10, seconds: 1 })

    expect(humanize(date4)).toBe("Started 3 hours and 10 minutes ago");

    const date5 = addToDate(date, { days: -6 })

    expect(humanize(date5)).toBe("6 days ago");

    const date6 = addToDate(date, { days: -8 })

    expect(humanize(date6)).toBe("More than a week ago");
});

test('test date additions are working', () => {
    const now = new Date();

    const inAnHour = addToDate(now, { minutes: 60 });

    const timeDiff = inAnHour.getTime() - now.getTime();

    expect(timeDiff).toBe(hourInMs);
});
