import mailEpic from '../components/Contact/contact-epic';
import checkoutEpic from '../components/Checkout/checkout-epic';
import { combineEpics } from 'redux-observable';

export default combineEpics(mailEpic('artetexture'), checkoutEpic);
