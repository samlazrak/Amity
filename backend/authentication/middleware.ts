import { Response, Request } from 'express';
import { User } from '../../shared/types/authentication';
import UserAPI from '../api/user';
import Tokens from './tokens';

/**
 * Attaches the user to the request object if a valid authorization header token is set
 * @param req
 * @param res
 * @param next
 */
export const bindUserToRequest = async (req: Request, res: Response, next: Function): Promise<void> => {
  if (!req.headers || !req.headers.authorization) return next();
  try {
    // pull JWT out of Authorization header
    const token = req.headers.authorization.split(' ')[1];
    // verify the JWT
    const tokenUserArgs = await Tokens.verifyToken(token);
    // re-fetch user to get most up to date privileges
    const user = await UserAPI.fetchOne({ id: tokenUserArgs.id });
    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};

export const issueToken = async (req: Request, res: Response, next: Function): Promise<void> => {
  if (!req.user) {
    next(new Error('No user object to issue token for.'));
  }

  const { token } = await UserAPI.generateAuthResponse(req.user);
  res.redirect(`/authenticate/${token}`);
};


/**
 * Attaches the user object to the Apollo/GraphQL/API context object
 * @param input
 */
export const getApolloContext = (input: { req: Request }): { user: User|null } => {
  return {
    // @ts-ignore
    user: input.req.user,
  };
};

/**
 * Restricts an API method to signed-in users only
 * @param args
 * @param context
 */
export const restrictToUser = async (args: any, context: any) => {
  if (!context.user) throw new Error('User must be logged in.');
};

/**
 * Restricts an API method to super users only
 * @param args
 * @param context
 */
export const restrictToSuper = async (args: any, context: any) => {
  // ensure user is signed in first
  await restrictToUser(args, context);
  if (!context.user.get('userRoles').permissions.includes('super')) {
    throw new Error('Invalid permissions.');
  }
};

/**
 * Restricts an API route to a custom set of user permissions roles
 * @param permissions
 */
export const restrictTo = (...permissions: string[]): Function => {
  return async (args: any, context: any): Promise<void> => {
    // ensure user is signed in first
    await restrictToUser(args, context);
    // allow super users to access all API methods
    if (context.user.get('userRoles').permissions.includes('super')) return;

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i];
      if (context.user.get('userRoles').permissions.includes(permission)) return;
    }

    throw new Error('Invalid permissions.');
  };
};

/**
 * Middleware to force https on all http requests
 * @param req
 * @param res
 * @param next
 */
export const forceHttps = (req: Request, res: Response, next: Function) => {
  if (req.headers && req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(['https://', req.hostname, req.url].join(''));
  }

  next();
};
