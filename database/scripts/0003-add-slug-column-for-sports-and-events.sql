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
            -- handling special cases of events with dash in their names
            REPLACE(events.name, ' - ', ' '),
            ' ',
            '-'
        )
    );

-- set not null and unique constraints on it for future items

ALTER TABLE events
	ALTER COLUMN slug SET NOT NULl;

ALTER TABLE sports 
	ALTER COLUMN slug SET NOT NULL;

ALTER TABLE events
    ADD CONSTRAINT event_slug_unique UNIQUE (slug);

ALTER TABLE sports
    ADD CONSTRAINT sport_slug_unique UNIQUE (slug);


-- add indexes to slug columns as we're gonna be querying for them a lot

CREATE INDEX event_slug_index ON events(slug);
CREATE INDEX sport_slug_index ON sports(slug);
