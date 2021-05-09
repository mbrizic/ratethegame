import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as logger from 'morgan';
import Routes from './core/route.interface';
import errorMiddleware from './core/middleware/error.middleware';
import { database } from './core/database';
import pageViewMiddleware from './core/middleware/pageview.middleware';

class App {
	public app: express.Application;
	public port: (string | number);
	public env: boolean;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.env = process.env.NODE_ENV === 'production' ? true : false;

		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`🚀 App listening on the port ${this.port}`);
		});
	}

	public getServer() {
		return this.app;
	}

	private initializeMiddlewares() {
		if (this.env) {
			this.app.use(hpp());
			this.app.use(helmet());
			this.app.use(logger('combined'));
			this.app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
		} else {
			this.app.use(logger('dev'));
			this.app.use(cors({ origin: true, credentials: true }));
		}
		database.sync({ force: false });
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(pageViewMiddleware())
	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach((route) => {
			this.app.use('/', route.router);
		});
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

}


export default App;
