import { combineEpics } from 'redux-observable';
import paymentEpic from './PaymentMethods/payment-methods-epic';

export default combineEpics(paymentEpic);
