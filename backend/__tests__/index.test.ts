import helmet from 'helmet';
import * as Sentry from '@sentry/node';
import * as routes from '../routes';

const json = jest.fn();
const urlencoded = jest.fn();

jest.mock('express', () => require('jest-express'));
jest.mock('helmet');
jest.mock('@sentry/node', () => ({
  init: jest.fn(),
}));
jest.doMock('body-parser', () => ({ json, urlencoded }));
jest.mock('../routes');
jest.mock('../utils/errors');

import app from '../index';

describe('App', () => {
  test('Should initialize app correctly', () => {
    expect(json).toHaveBeenCalled();
    expect(urlencoded).toHaveBeenCalled();
    expect(helmet).toHaveBeenCalled();
  });

  test('Should configure Sentry', () => {
    expect(Sentry.init).toHaveBeenCalledTimes(1);
  });

  test('Should configure routes', () => {
    expect(routes.configureRoutes).toHaveBeenCalled();
  });

  test('Should set up all necessary middleware', () => {
    expect(app.use).toHaveBeenCalledTimes(15);
  });

  test('Should start the app', () => {
    expect(app.listen).toHaveBeenCalledWith('3000');
  });
});
