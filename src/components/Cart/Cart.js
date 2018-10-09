import * as React from 'react';
import { Link } from 'gatsby';
import Button from '../Button';
import CartContents from '../CartContents';

import './cart.sass';

class Cart extends React.PureComponent<Props> {
  render() {
    return (
      <aside className="cart">
        <h4 className="cart_h4">Shopping Bag Contents</h4>
        <CartContents />
        <Link to="/checkout/shipping-address">
          <Button>Checkout</Button>
        </Link>
      </aside>
    );
  }
}

export default Cart;
