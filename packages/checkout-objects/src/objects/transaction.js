import defaults from './defaults';
import orderId from './order-id';
import serverAddress from './server-address';
import customer from './customer';

const transaction = {
  paymentMethodNonce: {},
  billing: serverAddress,
  shipping: serverAddress,
  customer,
  lineItems: [],
  orderId: defaults('', orderId()),
  amount: 0,
};

export default transaction;
