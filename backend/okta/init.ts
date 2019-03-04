import passport from 'passport';
import { Strategy } from 'passport-saml';
import url from 'url';
import UserAPI from '../api/user';
import config from 'config';
import { OktaProfile } from './../../shared/types/authentication';

const path = '/auth/okta';
const settings = {
  path,
  issuer: config.get('okta.issuer'),
  entryPoint: config.get('okta.entryPoint'),
  cert: config.get('okta.cert'),
  additionalParams: {
    RelayState: url.resolve(config.get('app.url'), path),
  },
};

const handler = async (profile: OktaProfile, done: Function) => {
  try {
    const user = await UserAPI.getOrCreateOktaUser(profile);
    done(null, user);
  } catch (err) {
    done(err);
  }
}

export default () => {
  // @ts-ignore
  passport.use(new Strategy(settings, handler));
};
