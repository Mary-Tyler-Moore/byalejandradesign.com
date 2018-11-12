/** @flow */
import { nullish, pipeAsync } from 'smalldash';
import axios from 'axios';
import gateway from './gateway';
import env from '@byalejandradesign/server-env';
import { validateTransaction } from '@byalejandradesign/checkout-objects';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@byalejandradesign/checkout-objects';

type CTX = {
  transaction: Transaction,
  body: {
    ...?Transaction,
  },
  gatewayResponse?: {},
  mailResponse?: {},
};

/** validate our transaction data */
const validate = (ctx: CTX): Promise<CTX> =>
  new Promise((resolve, reject) => {
    const transaction = validateTransaction(ctx.body);
    resolve({
      ...ctx,
      transaction,
    });
  });

/** send the transaction to the payment gateway */
const checkout = (ctx: CTX): Promise<CTX> =>
  new Promise((resolve, reject) => {
    gateway.transaction
      .sale({
        ...ctx.transaction,
        options: {
          submitForSettlement: true,
        },
      })
      .then((response) =>
        resolve({
          ...ctx,
          gatewayResponse: response,
        })
      )
      .catch((error) =>
        resolve({
          ...ctx,
          gatewayResponse: error,
        })
      );
  });

/** send a confirmation email */
const confirmation = (ctx): Promise<CTX> =>
  new Promise((resolve, reject) => {
    if (ctx.gatewayResponse.success === true) {
      axios({
        url: `${env.MAIL_DOMAIN || ''}/order-confirmation`,
        method: 'POST',
        body: {
          transaction: ctx.transaction,
        },
        headers: {
          Authorization: env.API_KEY,
        },
      })
        .then((response) =>
          resolve({
            ...ctx,
            mailResponse: response,
          })
        )
        .catch((error) =>
          resolve({
            ...ctx,
            mailResponse: error,
          })
        );
    }

    resolve({
      ...ctx,
      mailResponse: {},
    });
  });

const pipeline = (req: $Request, res: $Response) => {
  pipeAsync(validate, checkout, confirmation)({
    body: req.body,
  })
    .then((ctx) => {
      if (ctx.gatewayResponse.success === true && ctx.mailResponse === 200) {
        res.status(200).json({
          message: 'transaction approved',
          status: 200,
        });
      } else {
        // log specifics to all failed transactions
        console.log({
          orderId: ctx.transaction.orderId,
          mailResponse: ctx.mailResponse.status,
          gatewayResponse: ctx.gatewayResponse.success,
          ctx: JSON.stringify(ctx, null, 2),
        });

        res.status(404).json({
          message: 'transaction not accepted',
          status: 404,
        });
      }
    })
    // no promises reject so all errors should trickle up to the pipeline handler
    .catch((error) => console.log(error));
};

export default pipeline;
