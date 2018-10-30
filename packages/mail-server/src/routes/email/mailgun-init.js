import Mailgun from './mailgun';
import env from '@byalejandradesign/server-env';

export default new Mailgun({
  apiKey: env.MAILGUN_API_KEY,
  domain: env.EMAIL_DOMAIN,
});
