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
    transaction?: Transaction,
  },
  gatewayResponse?: {},
  mailResponse?: {},
};

/** validate our transaction data */
const validate = (ctx: CTX): Promise<CTX> =>
  new Promise((resolve, reject) => {
    const transaction = validateTransaction(ctx.body.transaction);
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
        data: {
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
    } else {
      resolve({
        ...ctx,
      });
    }
  });

const logTransaction = (ctx) => {
  if (env.stage !== 'production') {
    const now = new Date();

    console.log({
      orderId: ctx.transaction.orderId,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      mailResponse: JSON.stringify(ctx.mailResponse, null, 2),
      gatewayResponse: JSON.stringify(ctx.gatewayResponse, null, 2),
      transaction: JSON.stringify(ctx.transaction, null, 2),
    });
  }
};

const pipeline = (req: $Request, res: $Response) => {
  pipeAsync(validate, checkout, confirmation)({
    body: req.body,
  })
    .then((ctx) => {
      // verbose stage specific logging
      logTransaction(ctx);

      if (ctx.gatewayResponse.success === true) {
        res.status(200).json({
          message: 'transaction approved',
          status: 200,
        });
      } else {
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
