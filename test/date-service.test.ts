import { addToDate, hourInMs, humanize } from "../server/core/date.service";

test('test date humanizer works', () => {
    const date = new Date();

    const tenSecondsAgo = addToDate(date, { seconds: -10 })

    expect(humanize(tenSecondsAgo)).toBe("Few seconds ago");

    const tenMinutesAgo = addToDate(date, { minutes: -10 })

    expect(humanize(tenMinutesAgo)).toBe("Few minutes ago");

    const threeHoursAgo = addToDate(date, { hours: -3 })

    expect(humanize(threeHoursAgo)).toBe("Few hours ago");

    const someTimeInFuture = addToDate(date, { hours: 100 })

    expect(humanize(someTimeInFuture)).toBe("Upcoming");
});


test('test date additions are working', () => {
    const now = new Date();

    const inAnHour = addToDate(now, { minutes: 60 });

    const timeDiff = inAnHour.getTime() - now.getTime();

    expect(timeDiff).toBe(hourInMs);
});
