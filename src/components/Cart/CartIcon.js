import React, { PureComponent } from 'react';
import withCart from './with-cart';
// style
import './cart-icon.sass';
// assets
import icon from './icon.svg';

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
        <div className="cartIcon_svgContainer">
          <img className="cartIcon_svg" src={icon} alt="cart" />
          <p className="cartIcon_itemText">{this.props.cart.totalQuantity}</p>
        </div>
      </div>
    );
  }
}

export default withCart(CartIcon);
