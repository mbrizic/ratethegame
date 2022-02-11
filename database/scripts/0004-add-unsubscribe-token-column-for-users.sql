CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- add new unsubscribe_token field to be used in conjuction with other values

ALTER TABLE public.users 
    ADD COLUMN unsubscribe_token uuid;

-- migrate values of existing data

UPDATE public.users
    SET unsubscribe_token = gen_random_uuid();

-- set not null and unique constraints on it for future items

ALTER TABLE public.users
	ALTER COLUMN unsubscribe_token SET NOT NULl;

ALTER TABLE public.users
    ADD CONSTRAINT user_unsubscribe_token_unique UNIQUE (unsubscribe_token);
