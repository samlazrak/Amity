import * as Sentry from '@sentry/node';
import config from 'config';

/**
 * Configuring Raven (sentry.io)
 * automagically catches and reports errors
 * https://docs.sentry.io/quickstart/
 */
export default () => {
  Sentry.init({
    dsn: config.get('raven.dsn'),
    attachStacktrace: true,
    serverName: config.get('app.url'),
  });
};
