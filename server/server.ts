import 'dotenv/config';
import App from './app';
import AuthRoute from './auth/auth.route';
import PageRoute from './pages/page.route';
import EventsRoute from './events/events.route';
import SportsRoute from './sports/sports.route';
import AdminRoute from './admin/admin.route';

initializeServer()

function initializeServer() {
	const app = new App([
		new PageRoute(),
		// new UsersRoute(),
		new AuthRoute(),
		new EventsRoute(),
		new SportsRoute(),
		new AdminRoute(),
	]);
	
	app.listen();
}