/** @flow */
import gateway from './gateway';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const validateBody = (body): boolean %checks => {
  return typeof body === 'object' && body !== null;
};

const validateTransaction = (body): boolean %checks => {
  return typeof body.transaction === 'object' && body !== null;
};

const checkout = async (req: $Request, res: $Response) => {
  if (validateBody(req.body) && validateTransaction(req.body)) {
    const {
      paymentMethodNonce,
      amount,
      billing,
      shipping,
      customer,
      lineItems,
      orderId,
    } = (req.body: Transaction);

    try {
      // const customer = await gateway.customer;
      const result = await gateway.transaction.sale({
        amount,
        paymentMethodNonce,
        billing,
        shipping,
        customer,
        lineItems,
        orderId,
        options: {
          submitForSettlement: true,
        },
      });

      res.status(200).json({
        result,
      });
    } catch (e) {
      console.log(e);
      res.status(404).json({
        status: 404,
        error: e,
      });
    }
  } else {
    res.status(404).json({
      status: 404,
      error: 'error validation request body',
    });
  }
};

export default checkout;
