import 'dotenv/config';
import App from './app';
import UsersRoute from './users/users.route';
import AuthRoute from './auth/auth.route';
import PageRoute from './pages/page.route';
import EventsRoute from './events/events.route';
import SportsRoute from './sports/sports.route';

initializeServer()

function initializeServer() {
	const app = new App([
		new PageRoute(),
		new UsersRoute(),
		new AuthRoute(),
		new EventsRoute(),
		new SportsRoute(),
	]);
	
	app.listen();
}