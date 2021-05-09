import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { DataStoredInToken, RequestWithUser } from '../../auth/auth.interface';
import UserService from '../../users/users.service';

const userService = new UserService()

export async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
	const cookies = req.cookies;

	if (cookies && cookies.Authorization) {
		const secret = process.env.JWT_SECRET;

		const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
		const userId = verificationResponse.id;
		const user = await userService.getById(userId)

		if (user) {
			req.user = user;
		}
	}

	next();
}

export async function ensureAuthenticated(req: RequestWithUser, res: Response, next: NextFunction) {
	if (req.user) {
		next()
	} else {
		res.status(401)
		res.statusMessage = 'No authentication token'
		res.redirect("/login")
	}
}

export async function ensureAdmin(req: RequestWithUser, res: Response, next: NextFunction) {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(401)
		res.statusMessage = 'No authentication token'
		res.redirect("/login")
	}
}

