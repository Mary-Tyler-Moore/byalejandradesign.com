import { combineEpics } from 'redux-observable';
import brainTreeEpic from './PaymentMethods/Braintree/braintree-epic';
import paymentEpic from './PaymentMethods/payment-methods-epic';
import addressValidationEpic from './Address/address-epic';

export default combineEpics(brainTreeEpic, paymentEpic, addressValidationEpic);
