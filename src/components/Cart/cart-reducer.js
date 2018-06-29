// @flow
import { uniq, compose } from 'smalldash';
import invariant from 'invariant';

import type { Actions } from './cart-actions';

export type ProductEntry = {
  id: number | string,
  quantity: number,
};

export type State = {
  products: Array<ProductEntry>,
  status: string,
  totalQuantity: number,
};

const initialCart: State = {
  products: [],
  status: '',
  totalQuantity: 0,
};

/**
 * Safely add quantities together so that they never go below 0
 * @param {number} a
 * @param {number} b
 */
const safeAddQuantity = (a: number, b: number) => (a + b > 0 ? a + b : 0);

/**
 * Reducer logic for updating quantity of a product BY an amount
 * @param {array} products array of objects 'products'
 * @param {object} action a redux style action
 */
const updateCart = (products, action: Actions) => {
  // error check actions
  invariant(action.id, `${action.type} must contain a product id`);
  // find old product quantity
  const product = products.find((product) => product.id === action.id);
  const quantity = product
    ? safeAddQuantity(product.quantity, action.quantity)
    : action.quantity;
  // update array uniq by product id with new product then removing all products with 0 quantity
  return uniq(
    [{ id: action.id, quantity }, ...products],
    (product) => product.id
  ).filter((product) => product.quantity > 0);
};

/**
 * Reducer logic for updating quantity of a product TO an amount
 * @param {array} products array of objects 'products'
 * @param {object} action a redux style action
 */
const updateCartDirectly = (products, { id, quantity, type }: Actions) => {
  // error check actions
  invariant(id, `${type} must contain a product id`);
  // update array uniq by product id with new product then removing all products with 0 quantity
  return uniq([{ id, quantity }, ...products], (product) => product.id).filter(
    (product) => product.quantity > 0
  );
};

const cartReducer = (state: State = initialCart, action: Actions) => {
  switch (action.type) {
    case 'CART_UPDATE_QUANTITY':
      return {
        ...state,
        products: updateCart(state.products, action),
      };
    case 'CART_UPDATE_QUANTITY_DIRECTLY':
      return {
        ...state,
        products: updateCartDirectly(state.products, action),
      };
    case 'CART_EMPTY':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};

// After reducer lets run our state through some functions to add global flags

/**
 * Reduce cart to total quantity
 * @param {*} products
 */
const reduceQuantity = (products) =>
  products.map((p) => p.quantity).reduce((a, b) => a + b, 0);

/**
 * Updates cart property totalQuantity
 * @param {object} state redux state
 */
const updateTotalQuantity = (state: State) => ({
  ...state,
  totalQuantity: reduceQuantity(state.products),
});

export default compose(
  updateTotalQuantity,
  cartReducer
);
