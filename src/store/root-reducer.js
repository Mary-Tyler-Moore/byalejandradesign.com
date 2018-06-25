import { combineReducers } from 'redux';
import { WPReducer } from '../utils/wp';
import contactReducer from '../components/Contact/contact-reducer';
import UIReducer from '../components/Root/ui-reducer';
import menuReducer from '../components/Header/menu-reducer';
import checkoutReducer from '../components/Checkout/checkout-reducer';
import cartReducer from '../components/Cart/cart-reducer';

const rootReducer = combineReducers({
  shop: WPReducer('shop'),
  ceramics: WPReducer('ceramics'),
  paintings: WPReducer('paintings'),
  sizes: WPReducer('sizes'),
  collections: WPReducer('collections'),
  contact: contactReducer,
  UI: UIReducer,
  menu: menuReducer,
  checkout: checkoutReducer,
  cart: cartReducer,
});

export default rootReducer;
