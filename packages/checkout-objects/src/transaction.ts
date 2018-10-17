import defaultServerAddress from './server-address';
import defaultCustomer from './customer';
// types
import { ServerAddress } from './server-address';
import { LineItem } from './line-item';
import { Customer } from './customer';

interface Transaction {
  paymentMethodNonce: {};
  shipping: ServerAddress;
  billing: ServerAddress;
  customer: Customer;
  lineItems: Array<LineItem>;
  orderId: string;
}

const defaultTransaction: Transaction = {
  paymentMethodNonce: {},
  billing: defaultServerAddress,
  shipping: defaultServerAddress,
  customer: defaultCustomer,
  lineItems: [],
  orderId: '',
};

export default defaultTransaction;
