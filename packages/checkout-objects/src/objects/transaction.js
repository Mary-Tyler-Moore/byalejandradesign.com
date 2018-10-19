/** @flow */
import defaults from './defaults';
import orderId from './order-id';
import serverAddress from './server-address';
import customer from './customer';
// types
import type { ServerAddress } from './server-address';
import type { LineItem } from './line-item';
import type { Customer } from './customer';

export type Transaction = {
  +paymentMethodNonce: {},
  +shipping: ServerAddress,
  +billing: ServerAddress,
  +customer: Customer,
  +lineItems: Array<LineItem>,
  +orderId: string,
  +amount: number,
};

const transaction: Transaction = {
  paymentMethodNonce: {},
  billing: serverAddress,
  shipping: serverAddress,
  customer: customer,
  lineItems: [],
  orderId: defaults('', orderId()),
  amount: 0,
};

export default transaction;
