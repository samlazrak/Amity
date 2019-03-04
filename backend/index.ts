import express from 'express';
import config from 'config';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import path from 'path';
import bodyParser from 'body-parser';
import passport from 'passport';
import sentry from './sentry';
import { configureRoutes } from './routes';
import { expressErrorHandler, apolloErrorHandler } from './utils/errors';
import schema from './schema';
import oktaInit from './okta/init';
import {
  bindUserToRequest,
  getApolloContext,
  forceHttps
} from './authentication/middleware';

sentry();

const app: express.Application = express();
const port: string = process.env.PORT || '3000';
const router = express.Router();
const apollo = new ApolloServer({
  schema,
  // Create context object for all GraphQL API methods
  context: getApolloContext,
  tracing: true,
  formatError: apolloErrorHandler,
});

oktaInit();
configureRoutes(router);

if (config.get('env') !== 'development') {
  app.use(forceHttps);
}

app.use(passport.initialize());

// Secure app with additional http headers via helmetjs
app.use(helmet());

// Serve static files from Parcel's dist folder
app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bindUserToRequest);

// Enable Apollo Server for GraphQL
apollo.applyMiddleware({ app });

app.use(router);
app.use(expressErrorHandler);
app.listen(port);

export default app;
