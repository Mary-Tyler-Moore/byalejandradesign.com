import { combineReducers } from 'redux';
import addressReducer from './address-reducer';
import brainTreeReducer from './braintree-reducer';
import paymentReducer from './payment-methods-reducer';

export default combineReducers({
  braintree: brainTreeReducer,
  billingAddress: addressReducer('billingAddress'),
  shippingAddress: addressReducer('shippingAddress'),
  payment: paymentReducer,
});
