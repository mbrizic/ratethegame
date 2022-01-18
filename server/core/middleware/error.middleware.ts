import { Request, Response, NextFunction } from 'express';
import { ErrorPage } from '../../../ui/page/error.page';
import { RequestWithPotentialUser } from '../../auth/auth.interface';
import { recordError } from '../error.service';

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
	const status: number = error.status || 500;

	let message: string

	if (error.errors) {
		message = error.errors[0].message
	} else if (error.message) {
		message = error.message
	} else {
		message = 'Something went wrong.'
	}

	recordError(status, message)

	console.error('[ERROR] ', message);

	const user = (req as RequestWithPotentialUser).user;

	res.send(ErrorPage({
		user,
		errorMessage: message
	}))
}

export default errorMiddleware;
