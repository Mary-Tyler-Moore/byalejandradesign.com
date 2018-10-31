/** @flow */
import pipeline from '../../lib/pipeline';
import mailgun from '../../lib/mailgun-init';
import env from '@byalejandradesign/server-env';

type CTX = {
  body: {
    name: string,
    subject: string,
    email: string,
    message: string,
  },
  mailgunMessage: {
    from: string,
    to: string,
    subject: string,
    text: string,
  },
  id?: string,
  message?: string,
  status?: number,
};

const validateBody = (body): boolean %checks => {
  return Boolean(body.name && body.email && body.subject && body.message);
};

const validateMessage = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    if (validateBody(ctx.body)) {
      // build the message
      const mailgunMessage = {
        from: `${ctx.body.name} <${ctx.body.email}>`,
        to: env.EMAIL_RECIPIENT,
        subject: ctx.body.subject,
        text: ctx.body.message,
      };

      res({
        ...ctx,
        mailgunMessage,
      });
    } else {
      rej({
        ...ctx,
        status: 402,
        message: 'message body invalid',
      });
    }
  });

const sendMessage = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    mailgun
      .send(ctx.mailgunMessage)
      .then((response) => {
        res({
          ...ctx,
          ...response,
        });
      })
      .catch((error) => {
        rej({
          ...ctx,
          status: 502,
          message: error || 'invalid gateway response',
        });
      });
  });

export default pipeline(validateMessage, sendMessage);
