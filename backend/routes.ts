import passport from 'passport';
import path from 'path';
import expressPlayground from 'graphql-playground-middleware-express';
import { Router, Response, Request } from 'express';
import { issueToken } from './authentication/middleware';

const okta = passport.authenticate('saml', {
  session: false,
  failureRedirect: '/',
  failureFlash: true,
});

export const configureRoutes = (router: Router): void => {
  router.get('/playground', expressPlayground({ endpoint: 'graphql' }));

  router.get('/okta', okta);
  router.post('/auth/okta', okta, issueToken);

  router.get('*', (req: Request, res: Response) => {
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};
