CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- add new salt and uuid fields to be used in conjuction with other values

ALTER TABLE public.users 
    ADD COLUMN salt TEXT;
ALTER TABLE public.users 
    ADD COLUMN uuid uuid;

-- migrate values of existing data

UPDATE public.users
    SET salt = encode(gen_random_bytes(32), 'base64');

UPDATE public.users
    SET uuid = gen_random_uuid();

-- set not null and unique constraints on it for future items

ALTER TABLE public.users
	ALTER COLUMN salt SET NOT NULl;
ALTER TABLE public.users
	ALTER COLUMN uuid SET NOT NULl;

ALTER TABLE public.users
    ADD CONSTRAINT user_salt_unique UNIQUE (salt);
ALTER TABLE public.users
    ADD CONSTRAINT user_uuid_unique UNIQUE (uuid);

-- add indexes to salt, uuid columns as we're gonna be querying for them a lot

CREATE INDEX user_salt_index ON public.users(salt);
CREATE INDEX user_uuid_index ON public.users(uuid);
