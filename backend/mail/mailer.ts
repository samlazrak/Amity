import config from 'config';
import sendgrid from '@sendgrid/mail';
import { getInviteUserEmail } from './templates';

sendgrid.setApiKey(config.get('sendgrid.key'));

export interface Email {
  to: string;
  subject: string;
  html: string;
};

class Mailer {
  public static async sendEmail(args: Email): Promise<any> {
    const data = Object.assign({}, args, {
      from: 'Creature <support@creaturebuilds.com>'
    });
    sendgrid.send(data);
  }
}

export default Mailer;
