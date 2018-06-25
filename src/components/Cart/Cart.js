import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'smalldash';
// actions
import {
  addOneToCart,
  removeOneFromCart,
  updateCartQuantity,
  updateCartQuantityDirectly,
  emptyCart,
} from './cart-actions';

class Cart extends PureComponent {
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

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  addOneToCart: (id) => dispatch(addOneToCart(id)),
  removeOneFromCart: (id) => dispatch(removeOneFromCart(id)),
  updateCartQuantity: (obj) => dispatch(updateCartQuantity(obj)),
  updateCartQuantityDirectly: (obj) =>
    dispatch(updateCartQuantityDirectly(obj)),
  emptyCart: () => dispatch(emptyCart),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Cart);
