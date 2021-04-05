CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    email CHARACTER varying(45) NOT NULL,
    password CHARACTER varying(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_users_email UNIQUE (email)
);

CREATE TABLE public.sports
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_sports_name UNIQUE (name)
);

CREATE TABLE public.events
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    sport_id INTEGER NOT NULL REFERENCES public.sports (id)
);

CREATE TABLE public.event_rating
(
    id SERIAL PRIMARY KEY,
    rating INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    event_id INTEGER NOT NULL REFERENCES public.events (id)
);