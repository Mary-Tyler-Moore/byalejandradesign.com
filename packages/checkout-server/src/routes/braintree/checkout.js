/** @flow */
import gateway from './gateway';
// types
import type { Router, $Request, $Response } from 'express';
import type { Transaction } from 'checkout';

const checkout = async (req: $Request, res: $Response) => {
  const {
    paymentMethodNonce,
    amount,
    billing,
    shipping,
    customer,
    lineItems,
    orderId,
  } = req.body;

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
};

export default checkout;
