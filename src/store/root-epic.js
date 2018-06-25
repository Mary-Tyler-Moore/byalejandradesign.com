import { WPEpic } from '../utils/wp';
import mailEpic from '../components/Contact/contact-epic';
import menuEpic from '../components/Header/menu-epic';
import checkoutEpic from '../components/Checkout/checkout-epic';
import { combineEpics } from 'redux-observable';

export default combineEpics(
  WPEpic,
  mailEpic('artetexture'),
  menuEpic,
  checkoutEpic
);