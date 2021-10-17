import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithPotentialUser, RequestWithUser } from '../../auth/auth.interface';
import UserService from '../../users/users.service';
import { getAppConfig } from '../app.config';
import { returnUrlQueryParam } from '../constants';

const userService = new UserService()

const redirectUrl = getAppConfig().isDebugMode ? "/login" : "/register"

export async function ensureAuthenticated(req: RequestWithUser, res: Response, next: NextFunction) {
	await getUserFromCookieIfExists(req)

	if (req.user) {
		next()
	} else {
		res.status(401)
		res.statusMessage = 'No authentication token'
		res.redirect(`${redirectUrl}?${returnUrlQueryParam}=${req.path}`)
	}
}

export async function ensureAdmin(req: RequestWithPotentialUser, res: Response, next: NextFunction) {
	await getUserFromCookieIfExists(req)

	if (req.user?.isAdmin) {
		next()
	} else {
		res.status(401)
		res.statusMessage = 'No authentication token'
		res.redirect(redirectUrl)
	}
}

export async function readUserCredentials(req: RequestWithPotentialUser, res: Response, next: NextFunction) {
	await getUserFromCookieIfExists(req)
	next();
}

export async function getUserFromCookieIfExists(req: RequestWithPotentialUser) {
	if (req.user) {
		return
	}

	const cookies = req.cookies;

	if (cookies && cookies.Authorization) {

		const secret = getAppConfig().jwtSecret;

		const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
		const userId = verificationResponse.id;
		const user = await userService.getById(userId)

		if (user) {
			req.user = user;
		}
	}
}
