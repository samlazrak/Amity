import { Router } from 'express';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { configureRoutes } from './../routes';

describe('Routes', () => {
  let router: Router;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    router = Router();
    router.get = jest.fn();
    req = new Request();
    res = new Response();
  });

  test('Should configure root routes', () => {
    configureRoutes(router);
    expect(router.get).toHaveBeenCalledTimes(3);

    // @ts-ignore
    const wildcardCall = router.get.mock.calls.pop();

    expect(wildcardCall[0]).toBe('*');
    expect(wildcardCall[1]).toBeDefined();

    wildcardCall[1](req, res);

    expect(res.sendFile).toHaveBeenCalledTimes(1);

    // @ts-ignore
    const oktaCall = router.get.mock.calls.pop();
    expect(oktaCall[0]).toBe('/okta');
    expect(oktaCall[1]).toBeDefined();

    // @ts-ignore
    const playgroundCall = router.get.mock.calls.pop();

    expect(playgroundCall[0]).toBe('/playground');
    expect(wildcardCall[1]).toBeDefined();
  });
});
