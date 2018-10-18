/** @flow */
import defaultServerAddress from './server-address';
import defaultCustomer from './customer';
// types
import type { ServerAddress } from './server-address';
import type { LineItem } from './line-item';
import type { Customer } from './customer';

export type Transaction = {
  paymentMethodNonce: {},
  shipping: ServerAddress,
  billing: ServerAddress,
  customer: Customer,
  lineItems: Array<LineItem>,
  orderId: string,
};

const defaultTransaction: Transaction = {
  paymentMethodNonce: {},
  billing: defaultServerAddress,
  shipping: defaultServerAddress,
  customer: defaultCustomer,
  lineItems: [],
  orderId: '',
};

export default defaultTransaction;
