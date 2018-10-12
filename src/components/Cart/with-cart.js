/** @flow */
import * as React from 'react';
import { connect } from 'react-redux';
// actions
import {
  addOneToCart,
  removeOneFromCart,
  updateCart,
  updateCartDirectly,
  emptyCart,
} from './cart-actions';
// flow
import type { State } from './cart-reducer';

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
  updateCart: (obj) => dispatch(updateCart(obj)),
  updateCartDirectly: (obj) => dispatch(updateCartDirectly(obj)),
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
