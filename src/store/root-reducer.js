import { combineReducers } from 'redux';
import UIReducer from '../components/Root/ui-reducer';
import menuReducer from '../components/Header/menu-reducer';
import checkoutReducer from '../components/Checkout/checkout-reducer';
import cartReducer from '../components/Cart/cart-reducer';

const rootReducer = combineReducers({
  UI: UIReducer,
  menu: menuReducer,
  checkout: checkoutReducer,
  cart: cartReducer,
});

export default rootReducer;
