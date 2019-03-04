import config from 'config';
import fs from 'fs';
import path from 'path';
import url from 'url';
import handlebars from 'handlebars';
import { Email } from './mailer';

const baseUrl = config.get('app.url') as string;

const inviteUserTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, './templates/invite-user.hbs'), 'utf8')
);

export const getInviteUserEmail = (name: string, toEmail: string, token: string): Email => {
  return {
    to: toEmail,
    subject: 'Complete your Amity Account.',
    html: inviteUserTemplate({
      name: name,
      link: url.resolve(baseUrl, `/register/${token}`),
    }),
  };
};

const resetPasswordTemplate = handlebars.compile(
  fs.readFileSync(path.join(__dirname, './templates/reset-password.hbs'), 'utf8')
);

export const getResetPasswordEmail = (toEmail: string, token: string): Email => {
  return {
    to: toEmail,
    subject: 'Reset Your Amity Password',
    html: resetPasswordTemplate({
      link: url.resolve(baseUrl, `/reset/${token}`),
    }),
  };
};
