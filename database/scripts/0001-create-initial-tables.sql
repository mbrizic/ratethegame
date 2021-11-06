CREATE SCHEMA IF NOT EXISTS public;

-- Make sure all dates are written in UTC without timezone data
SET TIMEZONE TO UTC;

CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email CHARACTER varying(45) NOT NULL,
    password CHARACTER varying(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_users_email UNIQUE (email),
    CONSTRAINT length_email CHECK (char_length(email) > 3)
);

CREATE TABLE public.sports
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    created_by INTEGER NOT NULL REFERENCES public.users (id),

    CONSTRAINT unique_sports_name UNIQUE (name),
    CONSTRAINT length_name CHECK (char_length(name) > 3)
);

CREATE TABLE public.events
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    datetime TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by INTEGER NOT NULL REFERENCES public.users (id),
    sport_id INTEGER NOT NULL REFERENCES public.sports (id),

    CONSTRAINT length_name CHECK (char_length(name) > 3)
);

CREATE TABLE public.event_rating
(
    id SERIAL PRIMARY KEY,
    would_recommend BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_by INTEGER NOT NULL REFERENCES public.users (id),
    event_id INTEGER NOT NULL REFERENCES public.events (id),

    CONSTRAINT unique_user_per_event UNIQUE (created_by, event_id)
);

CREATE TABLE public.user_settings
(
    id SERIAL PRIMARY KEY,
    receive_top_rated_notifications BOOLEAN NOT NULL DEFAULT false,

    user_id INTEGER NOT NULL REFERENCES public.users (id),

    CONSTRAINT unique_user UNIQUE (user_id)
);

CREATE TABLE public.user_sport_subscriptions
(
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL REFERENCES public.users (id),
    sport_id INTEGER NOT NULL REFERENCES public.sports (id),

    CONSTRAINT unique_user_per_sport UNIQUE (user_id, sport_id)    
);
