-- add new slug field to be used in URLs

ALTER TABLE sports 
    ADD COLUMN slug TEXT;

ALTER TABLE events 
    ADD COLUMN slug TEXT;

-- migrate values of existing data

UPDATE sports 
    SET slug = LOWER(
        REPLACE(sports.name, ' ', '-')
    );

UPDATE events 
    SET slug = LOWER(
        REPLACE(
            REPLACE(events.name, ' - ', ' '),
            ' ',
            '-'
        )
    );

-- fix some incorrectly named events which end up with duplicated dashes
-- UPDATE events 
--     SET slug = REPLACE(events.slug, '--', '-');

-- set not null and unique constraints on it for future items

ALTER TABLE events
	ALTER COLUMN slug SET NOT NULl;

ALTER TABLE sports 
	ALTER COLUMN slug SET NOT NULL;

ALTER TABLE events
    ADD CONSTRAINT event_slug_unique unique (slug);

ALTER TABLE sports
    ADD CONSTRAINT sport_slug_unique unique (slug);
