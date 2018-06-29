import { combineReducers } from 'redux';
import checkoutReducer from '../components/Checkout/checkout-reducer';
import cartReducer from '../components/Cart/cart-reducer';

const rootReducer = combineReducers({
  checkout: checkoutReducer,
  cart: cartReducer,
});

export default rootReducer;
