import { combineReducers } from 'redux';
import addressReducer from './address-reducer';
import brainTreeReducer from '../../Braintree/braintree-reducer';
import dataCollectorReducer from '../../DataCollector/data-collector-reducer';
import paymentReducer from './payment-methods-reducer';

export default combineReducers({
  braintree: brainTreeReducer,
  dataCollector: dataCollectorReducer,
  billingAddress: addressReducer('billingAddress'),
  shippingAddress: addressReducer('shippingAddress'),
  payment: paymentReducer,
});
