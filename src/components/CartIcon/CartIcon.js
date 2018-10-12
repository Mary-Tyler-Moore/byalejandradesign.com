import * as React from 'react';
import { withCart } from '../Cart';
// style
import './cart-icon.sass';
// assets
import icon from './icon.svg';

type Props = {
  className?: string,
  cart: {
    totalQuantity: number,
  },
};

/**
 * A cart icon displaying quantity and linking to the shopping cart page
 * @param {object} props react props
 */
class CartIcon extends React.PureComponent<Props> {
  render() {
    return (
      <figure className={`cartIcon ${this.props.className || ''}`}>
        <img className="cartIcon_svg" src={icon} alt="cart" />
        <p className="cartIcon_itemText">{this.props.cart.totalQuantity}</p>
      </figure>
    );
  }
}

export default withCart(CartIcon);
