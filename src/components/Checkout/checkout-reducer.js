import { combineReducers } from 'redux';
import addressReducer from './Address/address-reducer';
import brainTreeReducer from './PaymentMethods/Braintree/braintree-reducer';
import paymentReducer from './PaymentMethods/payment-methods-reducer';

export default combineReducers({
  braintree: brainTreeReducer,
  billingAddress: addressReducer('billingAddress'),
  shippingAddress: addressReducer('shippingAddress'),
  payment: paymentReducer,
});
