INSERT INTO public.users(id, email, password, is_admin) values 
    (1, 'mario@mail.com', '$2b$10$GZXSTFoCY3yAsv5poMBSMuZ0bx/pqJyS4tHHiMx40IC6ZzWvdT376', true),
    (2, 'mario2@mail.com', '$2b$10$GZXSTFoCY3yAsv5poMBSMuZ0bx/pqJyS4tHHiMx40IC6ZzWvdT376', false);

INSERT INTO public.sports(id, name, description, created_by) VALUES
    (1, 'Formula 1', '', 1), 
    (2, 'Football', '', 1), 
    (3, 'Basketball', '', 1);

INSERT INTO public.events(id, name, datetime, created_by, sport_id) VALUES 
    (1, 'Imola GP', '2021-04-18T15:00', 1, 1),
    (2, 'Portugal GP', '2021-05-02T15:00', 1, 1),
    (3, 'Monaco GP', '2021-05-30T15:00', 1, 1),
    (4, 'Real Madrid - Barcelona', '2020-05-30T15:00', 1, 2),
    (5, 'LA Lakers - NY Nets', '2020-05-30T15:00', 1, 2);

INSERT INTO public.event_rating(would_recommend, created_by, event_id) VALUES 
    (true, 1, 1),
    (true, 2, 1),
    (false, 1, 2),
    (false, 2, 2),
    (true, 2, 5);

-- Postgres requires us to reset autoincrement counters manually if we're inserting data by explicitly setting IDs
SELECT setval('users_id_seq', (SELECT MAX(id) from public.users));
SELECT setval('sports_id_seq', (SELECT MAX(id) from public.sports));
SELECT setval('events_id_seq', (SELECT MAX(id) from public.events));