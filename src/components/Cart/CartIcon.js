import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'smalldash';
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
    setTimeout(this.setIconWidth, 1000);
  }

  render() {
    return (
      <Link
        style={{ width: `${this.state.width}px` }}
        className="cartIcon"
        to="/checkout/cart"
      >
        <i
          className="fa fa-shopping-bag fa-3x cartIcon_img"
          ref={(node) => (this.icon = node)}
        />
        <span className="cartIcon_quantity">{this.props.quantity}</span>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  quantity: state.cart.totalQuantity,
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CartIcon);
