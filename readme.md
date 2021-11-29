# Rate the game

## What is this

This is a work-in-progress web app for rating sports events. 

Imagine you weren't able to watch last night's match/game/race and you're wondering if it's worth watching it today. But you have no one to ask, and you don't want to google it to see any spoilers, so what do you do? 

This site helps you with that. It allows users to vote if a match/race/game was worth watching or not, without any written comments so you can be pretty sure not to spoil the experience by seeing its outcome.

## Current project status (looking for collaborators)

I started this project on my own, but I'm looking to share it with anyone who might be interested. I set up some basic stuff like initial database tables, CRUD wiring for sports/events/votes and auth setup. However, there's a lot more to do and I'm looking for people who can help with following:

- branding - "Rate the game" is the best name I could think of, but we really need a better one. Something like "Is it worth watching" would be better
- insights on how you'd want to use this app - I know F1 and UFC fans sometimes watch replays the day after if they missed the original run, but not sure if it's like that for other sports. Also, can this rating system maybe be used for other stuff apart from sports?
- design work - there's no design whatsoever in the app now, looking for any help possible (wireframes, color schemes, anything). It's currently looking ugly af
- recommendation engine - the system should be able to track what the user likes, and then recommend sports events that might be interesting (and well rated) to them, and then push them that notification through email
- _really advanced_ - mine some data from other sports websites with more analytics/stats, correlate it with our scores, then use that to extrapolate the scores for old games, or maybe even predict it for the upcoming ones

## Tech setup

- views are generated server-side using our custom TypeScript-based templating engine, plain old CSS for styling, no JS at all at the moment
- Typescript + NodeJS on backend, exposing both JSON API endpoints and regular server-side rendered HTML pages 
- PostgreSQL as a database, using Sequelize as ORM, but with database-first approach
- database migrations are done with `npm run db-migrate` command, which executes all newly added scripts and regenerates needed TS classes

## Caching

We have simple in-memory caching setup with our custom `cache.service.ts` class. However, due to app having to do some mild number crunching while calculating event scores, we're caching not only plain database results, but rather entire constructed domain models. This will be performant, but we need to be careful about the following:
- as cache is shared between all users, we should never store any references to currently logged in user in domain model. Search `getVoteBelongingToUser` for example how to handle such cases.
- since domain models are aggregates of many database models, we will need to invalidate the caches more often than usual. For example, if some `event.model.ts` changes, we should invalidate it, but also its parent entities which can contain it (like `sport.model.ts` in this case). This might get complicated in the future (for example, if sport name changes, we should also invalidate all cached events belonging to it). For now our setup is pretty simple so it's not a problem, but if it proves to be, we should revert to caching of only database calls
- as we're not sure if this will work fine, we've added `AppSettings.isCacheEnabled` to be able to turn it off in runtime if needed
- if it turns out to be fine, we should implement some more automatic way to do it (middleware or function annotations)

## How to run the app

- checkout code
- create a Postgres role/database
- copy `.env.template` file into `.env`, change `POSTGRES_URL` to your database
- run `npm install`
- run `npm run db-migrate` to make sure your DB is up-to-date
- run `npm start` to run the app, or `npm run dev` to run a live-reload dev server

## Deploying it on server
- app is set up to use `pm2` on server and can be started by running `pm2 start npm --name ratethegame -- start`
- demo is deployed here: http://ratethegame.supercollider.hr/

