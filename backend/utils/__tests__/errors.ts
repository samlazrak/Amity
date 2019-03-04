import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { expressErrorHandler } from '../errors';

describe('Error Handling', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = new Request();
    res = new Response();
  });

  test('Error handler should set status and end with the error message', () => {
    const error: Error = new Error('Test error message.');

    // @ts-ignore
    expressErrorHandler(error, req, res);
    expect(res.send).toBeCalledWith(error.message);
  });
});
