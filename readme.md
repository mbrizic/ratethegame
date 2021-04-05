# Rate the game

## What is this

This is a work-in-progress web app for rating sports events. 

Imagine you weren't able to watch last night's match/game/race and you're wondering if it's worth watching it today. But you have no one to ask, and you don't want to google it to see any spoilers, so what do you do? 

This site helps you with that. It allows users to vote if a match/race/game was worth watching or not, without any written comments so you can be pretty sure not to spoil the experience by seeing its outcome.

## Current project status (looking for collaborators)

I started this project on my own, but I'm looking to share it with anyone who might be interested. I set up some basic stuff like initial database tables, CRUD wiring for sports/events/votes and auth setup. However, there's a lot more to do and I'm looking for people who can help with following:

- branding - "Rate the game" is the best name I could think of, but we really need a better one. Something like "Is it worth watching" would be better
- insights on how you'd want to use this app - I know F1 and UFC fans sometimes watch replays the day after if they missed the original run, but not sure if it's like that for other sports. Also, can this rating system maybe be used for other stuff apart from sports?
- frontend work - for now I'm just showing server-side rendered HTMLs from Pug templates, which I even kind of like, due to how simple and fast that is. However, if someone wants to convert it to a SPA for better UX, why not, provided it remains as performant
- design work - there's no design whatsoever in the app now, looking for any help possible (wireframes, color schemes, anything). It's currently looking ugly af
- recommendation engine - the system should be able to track what the user likes, and then recommend sports events that might be interesting (and well rated) to them, and then push them that notification through email
- _really advanced_ - mine some data from other sports websites with more analytics/stats, correlate it with our scores, then use that to extrapolate the scores for old games, or maybe even predict it for the upcoming ones

## Concrete tasks

Here are some concrete tasks that need to be resolved. I'll be working through those one by one, but if someone wants to take anything, just let me know:

- create a home dashboard showing most recent and best rated sports/events 
- think of some design that wouldn't be offensive to the eye
- implement notifications system through emails (for recommendation system)
- refactor database migrations system to not be tied to a build
- remove unused dependencies from `package.json`

What's done: 
- user is able to login/register
- user is able to add a new sports event
- user is able to add a new sport if it's missing
- user is able to add vote (and remove it)

## Tech setup

- Typescript + NodeJS on backend, exposing both JSON API endpoints and regular server-side rendered HTML pages 
- PostgreSQL as a database, using Sequelize as ORM, but with database-first approach
- Pug for HTML templating, plain old CSS for styling, no JS at all at the moment

- SQL migration scripts are ran everytime the server runs (needs to be refactored), but ORM is generating TS classes only when you run this command:
 `node_modules\.bin\sequelize-auto -o "./models" -d ratethegame -h localhost -u ratethegame -p 5432 -x ratethegame -e postgres -l ts --cm p`

 ## How to run the app
 
 - checkout code
 - run `npm install`
 - run `npm start` to run the app, or `npm run dev` to run a live-reload dev server
