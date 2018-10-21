/** @flow */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { OrderConfirmation } from '@artetexture/templates';
import layout from './layout';
import styles from './lib/styles';
import './order-confirmation.sass';
// types
import type { Transaction } from '@artetexture/checkout-objects';

const title = (orderId): string =>
  `Order Confirmation for ${orderId} from artetexture.com`;

const orderConfirmationTemplate = (transaction: Transaction): string => {
  return layout(
    renderToString(<OrderConfirmation transaction={transaction} />),
    {
      title: title(transaction.orderId),
      style: styles(['build/static/css/order-confirmation.css']),
    }
  );
};

export default orderConfirmationTemplate;
