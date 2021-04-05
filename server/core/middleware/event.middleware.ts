import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

//TODO: Add event logging here
function eventMiddleware(type: string): RequestHandler {
  return (req, res, next) => {
    next();
  };
}

export default eventMiddleware;
