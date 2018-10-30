/** @flow */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { OrderConfirmation } from '@byalejandradesign/templates';
import layout from './layout';
import stylesheets from '../lib/stylesheets';
import './order-confirmation.sass';
// types
import type { Transaction } from '@byalejandradesign/checkout-objects';

const title = (orderId): string =>
  `Order Confirmation for ${orderId} from byalejandradesign.com`;

const orderConfirmationTemplate = (transaction: Transaction): string => {
  return layout(
    renderToString(<OrderConfirmation transaction={transaction} />),
    {
      title: title(transaction.orderId),
      stylesheets: stylesheets(['/static/css/order-confirmation.css']),
    }
  );
};

export default orderConfirmationTemplate;
