import * as Sentry from '@sentry/node';
import { Request, Response } from 'express';

/**
 * Formats any Apollo Server/GraphQL errors
 * Also logs them to Sentry
 * @param error
 */
export const apolloErrorHandler = (error) => {
  Sentry.captureException(error);
  return error;
};

/**
 * Default express error handler
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 */
export const expressErrorHandler = (err: Error, req: Request, res: Response) => {
  res.send(err.message);
};
