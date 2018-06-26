import React, { PureComponent } from 'react';
import { Icon } from 'njmyers-component-library';
import withCart from './with-cart';
// style
import './cart-icon.sass';

/**
 * A cart icon displaying quantity and linking to the shopping cart page
 * @param {object} props react props
 */
class CartIcon extends PureComponent {
  state = {
    width: 48,
  };

  setIconWidth = () => {
    this.setState(
      (state) =>
        this.icon.clientWidth !== state.width ? this.icon.clientWidth : null
    );
  };

  componentDidMount() {
    // setTimeout(this.setIconWidth, 1000);
  }

  render() {
    return (
      <div className="cartIcon">
        <Icon.Ring
          width="20px"
          className="cartIcon_svg"
          color="white"
          thickness={8}
        />
        <span className="cartIcon_quantity">{this.props.quantity}</span>
      </div>
    );
  }
}

export default withCart(CartIcon);
