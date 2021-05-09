import { RequestHandler } from "express";
import { recordPageView } from "../pageview.service";

export default function pageViewMiddleware(): RequestHandler {
	return (req, res, next) => {
		recordPageView(req.url)
		next();
	};
}