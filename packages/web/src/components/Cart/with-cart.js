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

type DiffProps = {
  cart: State,
  addOneToCart: () => any,
  removeOneFromCart: () => any,
  updateCart: () => any,
  updateCartDirectly: () => any,
  emptyCart: () => any,
};

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

function withCart<Props: {}>(
  Wrapped: React.ComponentType<Props>
): React.ComponentType<$Diff<Props, DiffProps>> {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);
}

export default withCart;
