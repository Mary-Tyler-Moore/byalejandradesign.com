/** @flow */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { OrderConfirmation } from '@artetexture/templates';
import { transaction } from '@artetexture/checkout-objects';
import style from '@artetexture/templates/build/style.css';
import template from './template';
// types
import type { $Request, $Response } from 'express';
import type { Transaction } from '@artetexture/checkout-objects';

const title = (orderId): string =>
  `Order Confirmation for ${orderId} from artetexture.com`;

const orderConfirmation = (req: $Request, res: $Response) => {
  const transaction: Transaction =
    process.env.STAGE === 'development' ? transaction : req.body;

  const html = template(
    renderToString(<OrderConfirmation transaction={transaction} />, {
      title: title(transaction.orderId),
      style,
    })
  );

  res.status(200).send(html);
};

export default orderConfirmation;
