// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'smalldash';
// actions
import withCart from './with-cart';

import type { CartType } from './cart-reducer';

type Props = {
  edges: Array<{}>,
  cart: CartType,
};

class Cart extends React.PureComponent<Props> {
  render() {
    return (
      <aside className="cart">
        <p>This is your cart contents</p>
        <p>{JSON.stringify(this.props.cart.products)}</p>
        <Link to="/checkout/shipping-address">
          <button>Checkout</button>
        </Link>
      </aside>
    );
  }
}

export default withCart(Cart);
