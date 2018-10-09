// @flow
import * as React from 'react';
import { connect } from 'react-redux';
// actions
import {
  addOneToCart,
  removeOneFromCart,
  updateCartQuantity,
  updateCartQuantityDirectly,
  emptyCart,
} from './cart-actions';

const mapStateToProps = (state) => ({
  cart: state.cart,
});

/**
 * Map cart button events directly to action creators
 * @param  {[type]} dispatch [description]
 * @return {[type]}          [description]
 */
const mapDispatchToProps = (dispatch) => ({
  addOneToCart: (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = event.currentTarget.name;
    dispatch(addOneToCart(id));
  },
  removeOneFromCart: (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = event.currentTarget.name;
    dispatch(removeOneFromCart(id));
  },
  updateCartQuantity: (obj) => dispatch(updateCartQuantity(obj)),
  updateCartQuantityDirectly: (obj) =>
    dispatch(updateCartQuantityDirectly(obj)),
  emptyCart: (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(emptyCart);
  },
});

const withCart = (Wrapped: React.ComponentType<any>) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);

export default withCart;
