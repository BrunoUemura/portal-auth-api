import { Request, Response, NextFunction } from 'express';
import { HttpStatusCodes } from '../enum/HttpStatusCodes';
import { CustomError } from './CustomError';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
