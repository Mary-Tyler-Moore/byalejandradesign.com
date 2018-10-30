/** @flow */
import { compose } from 'smalldash';
// types
import type { Product, Action } from './cart-actions';

export type State = {
  products: Array<Product>,
  status: string,
  totalQuantity: number,
};

const initialCart: State = {
  products: [],
  status: '',
  totalQuantity: 0,
};

/** Safely add quantities together so that they never go below 0 */
function safeAddQuantity(a, b) {
  return a + b > 0 ? a + b : 0;
}

/** Filters for products which contain a quantity > 0 */
function filterQuantity(product) {
  return product.quantity > 0;
}

/** Gets the product and index by id */
function getProduct(products, id) {
  const index = products.findIndex((product) => product.id === id);
  const product = products[index];

  return {
    index,
    product,
  };
}

/** Reducer logic for updating quantity of a products by or with amount */
const updateCart = (products, action, direct = false) => {
  const { id, quantity: nextQuantity } = action;
  // find old product
  const { index, product } = getProduct(products, id);
  // safe add quantity
  const quantity =
    index >= 0 && !direct
      ? safeAddQuantity(product.quantity, nextQuantity)
      : nextQuantity;

  // slice array depending on if product was found
  return (
    [
      ...(index >= 0 ? products.slice(0, index) : products),
      { id, quantity },
      ...(index >= 0 ? products.slice(index + 1) : []),
    ]
      // remove zero quatity
      .filter(filterQuantity)
  );
};

/** Cart reducer */
function cartReducer(state: State = initialCart, action: Action) {
  switch (action.type) {
    case '@CART/UPDATE_QUANTITY':
    case '@CART/UPDATE_QUANTITY_DIRECTLY':
      const direct = action.type === '@CART/UPDATE_QUANTITY_DIRECTLY';
      return {
        ...state,
        products: updateCart(state.products, action, direct),
      };
    case '@CART/EMPTY':
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
}

/** Reduce cart to total quantity */
function reduceQuantity(products) {
  return products.map((p) => p.quantity).reduce((a, b) => a + b, 0);
}

/** Updates cart property totalQuantity */
function updateTotalQuantity(state: State) {
  return {
    ...state,
    totalQuantity: reduceQuantity(state.products),
  };
}

export default compose(
  updateTotalQuantity,
  cartReducer
);
