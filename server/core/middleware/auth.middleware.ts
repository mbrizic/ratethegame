import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithPotentialUser, RequestWithUser } from '../../auth/auth.interface';
import AuthService from '../../auth/auth.service';
import { getAppConfig } from '../app.config';
import { returnUrlQueryParam } from '../constants';

const authService = new AuthService()

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

export async function ensureIsCurrentUser(req: RequestWithUser, res: Response, next: NextFunction) {
	await getUserFromCookieIfExists(req)

	if (req.user.id?.toString() == req.params.id) {
		next()
	} else {
		res.status(403)
		res.statusMessage = 'Forbidden'
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
		
		try {
			const user = await authService.getUserById(userId)
			req.user = user;
			
		} catch (error) {
			return
		}
	}
}