import * as React from 'react';
import { Link } from 'gatsby';
import Button from '../Button';
import CartContents from '../CartContents';
import withCart from './with-cart';

import './cart.sass';

class Cart extends React.PureComponent<Props> {
  render() {
    return (
      <aside className="cart">
        <h4 className="cart_h4">Shopping Bag Contents</h4>
        <CartContents editable />
        {this.props.cart.products.length > 0 ? (
          <Link to="/checkout/shipping-address" className="link-reset">
            <Button>Checkout</Button>
          </Link>
        ) : (
          <Link to="/shop" className="link-reset">
            <Button>Continue Shopping</Button>
          </Link>
        )}
      </aside>
    );
  }
}

export default withCart(Cart);
