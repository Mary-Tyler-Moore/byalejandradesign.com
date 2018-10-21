/** @flow */
import { transaction as defaultTransaction } from '@artetexture/checkout-objects';
import { orderConfirmationTemplate } from '../../templates';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const orderConfirmation = (req: $Request, res: $Response) => {
  const transaction: Transaction =
    process.env.STAGE === 'development' ? defaultTransaction : req.body;

  res.status(200).send(orderConfirmationTemplate(transaction));
};

export default orderConfirmation;
