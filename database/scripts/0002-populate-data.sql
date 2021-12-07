INSERT INTO public.users(id, email, password, is_admin) values 
    (1, 'admin@mail.com', '$2b$10$y95nnWJsPYnnsuuLOTIVzO8U.kYbRrVROqCcDthlp/0xgcSVT.2tO', true),
    (2, 'admin2@mail.com', '$2b$10$y95nnWJsPYnnsuuLOTIVzO8U.kYbRrVROqCcDthlp/0xgcSVT.2tO', true),
    (3, 'rater@mail.com', '$2b$10$y95nnWJsPYnnsuuLOTIVzO8U.kYbRrVROqCcDthlp/0xgcSVT.2tO', false);

INSERT INTO public.sports(id, name, description, created_by) VALUES
    (1, 'Formula 1', '', 1), 
    (2, 'Football', '', 1), 
    (3, 'Basketball', '', 1);

INSERT INTO public.user_settings(user_id, receive_top_rated_notifications) VALUES
    (1, true),
    (2, false),
    (3, true);

INSERT INTO public.user_sport_subscriptions(user_id, sport_id) VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 3);

INSERT INTO public.events(id, name, datetime, created_by, sport_id) VALUES 
    (1, 'Real Madrid - Barcelona', '2020-05-30T15:00', 1, 2),
    (2, 'LA Lakers - NY Nets', '2020-05-30T15:00', 1, 2),
    (3, '2021 Mexico City GP', '2021-11-07T19:00', 1, 1),
    (4, '2021 Brazil GP', '2021-11-14T18:00', 1, 1),
    (5, '2021 Qatar GP', '2021-11-21T14:00', 1, 1),
    (6, '2021 Saudi Arabia GP', '2021-12-05T19:30', 1, 1),
    (7, '2021 Abu Dhabi GP', '2021-12-12T13:00', 1, 1);

INSERT INTO public.event_rating(event_id, created_by, would_recommend) VALUES 
    (3, 1, false),
    (3, 2, true),
    (3, 3, false),
    (4, 1, true),
    (4, 2, true),
    (5, 1, true),
    (5, 2, false);

-- Postgres requires us to reset autoincrement counters manually if we're inserting data by explicitly setting IDs
SELECT setval('users_id_seq', (SELECT MAX(id) from public.users));
SELECT setval('sports_id_seq', (SELECT MAX(id) from public.sports));
SELECT setval('events_id_seq', (SELECT MAX(id) from public.events));
