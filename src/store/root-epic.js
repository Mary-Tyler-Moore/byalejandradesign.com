import checkoutEpic from '../components/Checkout/checkout-epic';
import { combineEpics } from 'redux-observable';

export default combineEpics(checkoutEpic);
