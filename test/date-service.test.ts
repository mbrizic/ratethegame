import { addToDate, hourInMs, humanize } from "../server/core/date.service";

test('test date humanizer works', () => {
    const date = new Date();

    const tenSecondsAgo = addToDate(date, { seconds: -10 })

    expect(humanize(tenSecondsAgo)).toBe("Few seconds ago");

    const tenMinutesAgo = addToDate(date, { minutes: -10 })

    expect(humanize(tenMinutesAgo)).toBe("Few minutes ago");

    const threeHoursAgo = addToDate(date, { hours: -3 })

    expect(humanize(threeHoursAgo)).toBe("Few hours ago");

    const futureDate1 = addToDate(date, { hours: 4 })

    expect(humanize(futureDate1)).toBe("In exactly 4 hours");

    const futureDate2 = addToDate(date, { minutes: 240 })

    expect(humanize(futureDate2)).toBe("In exactly 4 hours");

    const futureDate3 = addToDate(date, { minutes: 241 })

    expect(humanize(futureDate3)).toBe("In 4 hours and 1 minutes");

    const futureDate4 = addToDate(date, { hours: 100 })

    expect(humanize(futureDate4)).toBe("In few days")
});


test('test date additions are working', () => {
    const now = new Date();

    const inAnHour = addToDate(now, { minutes: 60 });

    const timeDiff = inAnHour.getTime() - now.getTime();

    expect(timeDiff).toBe(hourInMs);
});
