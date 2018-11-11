import * as React from 'react';
import { Link } from 'gatsby';
import Button from '../Button';
import CartContents from '../CartContents';
import withCart from './with-cart';
// types
import type { State } from '../cart-reducer';
// style
import './cart.sass';

type Props = {
  cart: State,
};

class Cart extends React.PureComponent<Props> {
  render() {
    return (
      <aside className="cart">
        <h4 className="cart_h4">Shopping Bag Contents</h4>
        <CartContents editable />
        {this.props.cart.products.length > 0 ? (
          <Link to="/checkout/address" className="link-reset">
            <Button fullWidth margin>
              Checkout
            </Button>
          </Link>
        ) : (
          <Link to="/shop" className="link-reset">
            <Button fullWidth margin>
              Continue Shopping
            </Button>
          </Link>
        )}
      </aside>
    );
  }
}

export default withCart(Cart);
