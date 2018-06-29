import React, { PureComponent } from 'react';
// import { Icon } from 'njmyers-component-library';
import withCart from './with-cart';
// style
import './cart-icon.sass';

/**
 * A cart icon displaying quantity and linking to the shopping cart page
 * @param {object} props react props
 */
class CartIcon extends PureComponent {
  mergeClassNames = () =>
    this.props.className ? `cartIcon ${this.props.className}` : 'cartIcon';

  render() {
    return (
      <div className={this.mergeClassNames()}>
        {this.props.cart.totalQuantity}
      </div>
    );
  }
}

export default withCart(CartIcon);
