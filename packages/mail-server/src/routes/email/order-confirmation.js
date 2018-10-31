/** @flow */
import mailgun from '../../lib/mailgun-init';
import pipeline from '../../lib/pipeline';
import { orderConfirmationTemplate } from '../../templates';
import env from '@byalejandradesign/server-env';
import {
  transaction as defaultTransaction,
  validateTransaction,
} from '@byalejandradesign/checkout-objects';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@byalejandradesign/checkout-objects';

type CTX = {
  body: Transaction,
  transaction: Transaction,
  mailgunMessage: {
    from: string,
    to: string,
    subject: string,
    html: string,
  },
};

const validateMessage = (ctx: CTX): Promise<CTX> =>
  new Promise((res, rej) => {
    // stub transaction for development
    const transaction: Transaction =
      env.STAGE === 'development' ? defaultTransaction : ctx.body;

    if (validateTransaction(transaction)) {
      const html = orderConfirmationTemplate(transaction);
      const to =
        env.STAGE !== 'production'
          ? env.EMAIL_RECIPIENT
          : transaction.customer.email;

      const mailgunMessage = {
        from: `Alejandra Rojas <${env.EMAIL_RECIPIENT}>`,
        to,
        subject: `Order Confirmation from ${env.ROOT_DOMAIN}`,
        html,
      };

      res({
        ...ctx,
        mailgunMessage,
      });
    } else {
      rej({
        ...ctx,
        status: 402,
        message: 'transaction body is invalid',
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
          status: 402,
          message: 'message body invalid',
        });
      });
  });

export default pipeline(validateMessage, sendMessage);
