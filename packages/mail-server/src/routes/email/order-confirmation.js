/** @flow */
import mailgun from './mailgun-init';
import { transaction as defaultTransaction } from '@artetexture/checkout-objects';
import { orderConfirmationTemplate } from '../../templates';
import domain from '../../lib/domain';
import recipient from '../../lib/domain';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const orderConfirmation = async (req: $Request, res: $Response) => {
  const transaction: Transaction =
    process.env.STAGE === 'development' ? defaultTransaction : req.body;

  const html = orderConfirmationTemplate(transaction);
  const to =
    process.env.STAGE !== 'production'
      ? process.env.MAILGUN_RECIPIENT
      : transaction.customer.email;

  const message = {
    from: `Alejandra Rojas <${recipient()}>`,
    to,
    subject: `Order Confirmation from ${domain()}`,
    html,
  };

  try {
    const response = await mailgun.send(message);
    // const listResponse = await mailgun.lists();

    res.status(200).json({
      status: 200,
      response,
    });
  } catch (error) {
    const { statusCode, ...rest } = error;

    res.status(statusCode).json({
      status: statusCode,
      error:
        Object.keys(rest).length > 0 ? error : 'mailgun error sending message',
    });
  }
};

export default orderConfirmation;
