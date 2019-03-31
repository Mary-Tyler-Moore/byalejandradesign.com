/** @flow */
import pipeline from '../../lib/pipeline';
import mailgun from '../../lib/mailgun-init';
import env from '@byalejandradesign/server-env';

type CTX = {
  body: {
    members: string,
    list: string,
  },
  id?: string,
  message?: string,
  status?: number,
};

const validateBody = (body): boolean %checks => {
  return Boolean(body && body.members);
};

const subscribe = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    if (validateBody(ctx.body)) {
      const { members, list } = ctx.body;

      const defaultList =
        env.STAGE === 'production'
          ? 'mailer@mail.byalejandradesign.com'
          : 'mailer@mail--staging.byalejandradesign.com';

      mailgun
        .subscribe(list || defaultList, members)
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
    } else {
      rej({
        ...ctx,
        status: 402,
        message: 'message body invalid',
      });
    }
  });

const notify = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    const mailgunMessage = {
      from: env.EMAIL_RECIPIENT,
      to: env.EMAIL_RECIPIENT,
      subject: 'New Email Subscribers!',
      text: JSON.stringify(ctx.body, null, 2),
    };

    mailgun
      .send(mailgunMessage)
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

export default pipeline(subscribe, notify);
