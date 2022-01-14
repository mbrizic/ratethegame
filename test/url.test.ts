import { createSlug } from "../server/core/slug.service";

test('test slug gets constructed correctly', () => {
    expect(
        createSlug("Formula 1")
    ).toBe("formula-1")

    expect(
        createSlug("Barcelona - Real Madrid")
    ).toBe("barcelona-real-madrid")

    expect(
        createSlug("2021 Event    With Too Much   Whitespace ")
    ).toBe("2021-event-with-too-much-whitespace")

});
