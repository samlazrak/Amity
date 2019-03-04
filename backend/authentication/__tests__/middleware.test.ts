import { Request, Response } from 'express';
import * as middleware from '../middleware';
import Tokens from '../tokens';
import UserAPI from '../../api/user';

jest.mock('../../api/user');
jest.mock('../tokens');

describe('Authentication middleware', () => {
  let req: Request;
  let res: Response;
  let next: Function;
  const fakeUser = {
    name: 'John Doe',
    email: 'jdoe@creaturebuilds.com',
  };

  beforeEach(() => {
    jest.resetAllMocks();
    // @ts-ignore
    req = {
      headers: {
        authorization: 'Bearer we-are-not-builders',
        'x-forwarded-proto': 'http',
      },
      hostname: 'amity.creaturebuilds.com',
      url: '/',
    };
    // @ts-ignore
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  test('Binding user to request', (done) => {
    const fakeTokenData = {
      id: 'abc-123-456'
    };

    // @ts-ignore
    Tokens.verifyToken.mockReturnValue(Promise.resolve(fakeTokenData));
    // @ts-ignore
    UserAPI.fetchOne.mockReturnValue(Promise.resolve(fakeUser));

    middleware.bindUserToRequest(req, res, next)
      .then(() => {
        expect(Tokens.verifyToken).toHaveBeenCalledTimes(1);
        // @ts-ignore
        expect(Tokens.verifyToken.mock.calls[0][0]).toBe('we-are-not-builders');
        expect(UserAPI.fetchOne).toBeCalledTimes(1);
        // @ts-ignore
        expect(UserAPI.fetchOne.mock.calls[0][0]).toMatchObject(fakeTokenData);
        expect(req.user).toMatchObject(fakeUser);
        expect(next).toHaveBeenCalledTimes(1);
        // @ts-ignore
        expect(next.mock.calls[0][0]).toBeUndefined();
        done();
      });
  });

  test('Binding user to request with errors', (done) => {
    // @ts-ignore
    Tokens.verifyToken.mockReturnValue(Promise.reject(new Error('Test error')));

    middleware.bindUserToRequest(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledTimes(1);
        // @ts-ignore
        expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
        done();
      });
  });

  test('issueToken', (done) => {
    // @ts-ignore
    UserAPI.generateAuthResponse.mockReturnValue(Promise.resolve({ token: 'abc-123' }));

    req.user = fakeUser;

    middleware.issueToken(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledTimes(0);
        // @ts-ignore
        expect(res.redirect.mock.calls[0][0]).toBe('/authenticate/abc-123');
        done();
      });
  });

  test('getApolloContext', () => {
    const input = {
      req: {
        user: fakeUser,
      },
    };

    // @ts-ignore
    const context = middleware.getApolloContext(input);
    expect(context).toMatchObject({
      user: fakeUser,
    });
  });

  test('Force https', () => {
    middleware.forceHttps(req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.redirect).toBeCalledTimes(1);
    // @ts-ignore
    expect(res.redirect.mock.calls[0][0]).toBe('https://amity.creaturebuilds.com/');
  });
});
