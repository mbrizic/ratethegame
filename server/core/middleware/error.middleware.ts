import { Request, Response, NextFunction } from 'express';
import { ErrorPage } from '../../../ui/page/error.page';
import { RequestWithPotentialUser } from '../../auth/auth.interface';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
	const status: number = error.status || 500;
	const message: string = error.message || 'Something went wrong';

	console.error('[ERROR] ', status, message);

	const user = (req as RequestWithPotentialUser).user;

	res.send(ErrorPage({
		user,
		errorMessage: error.message
	}))
}

export default errorMiddleware;
