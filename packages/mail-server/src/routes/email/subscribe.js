/** @flow */
import pipeline from '../../lib/pipeline';
import mailgun from '../../lib/mailgun-init';
import env from '@byalejandradesign/server-env';

type CTX = {
  body: {
    email: string,
  },
  id?: string,
  message?: string,
  status?: number,
};

const validateBody = (body): boolean %checks => {
  return Boolean(body.email);
};

const signup = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    if (validateBody(ctx.body)) {
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
    } else {
      rej({
        ...ctx,
        status: 502,
        message: 'no email available for signup',
      });
    }
  });

export default pipeline(signup);
