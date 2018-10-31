/** @flow */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { OrderConfirmation } from '@byalejandradesign/templates';
import layout from './layout';
// types
import type { Transaction } from '@byalejandradesign/checkout-objects';
// styles
import css from './order-confirmation.sass';

const title = (orderId): string =>
  `Order Confirmation for ${orderId} from byalejandradesign.com`;

const orderConfirmationTemplate = (transaction: Transaction): string => {
  return layout(
    renderToString(<OrderConfirmation transaction={transaction} />),
    {
      title: title(transaction.orderId),
      stylesheets: css,
    }
  );
};

export default orderConfirmationTemplate;
