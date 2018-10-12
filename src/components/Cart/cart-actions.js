/** params needed for an update action */
export type Product = {
  /** id number or string */
  +id: string | number,
  /** number of quantity */
  +quantity: number,
};

/** Action Types */
export type Action =
  | { type: '@CART/UPDATE_QUANTITY', ...$Exact<Product> }
  | { type: '@CART/UPDATE_QUANTITY_DIRECTLY', ...$Exact<Product> }
  | { type: '@CART/EMPTY' };

/** Updates a product in cart BY the specified quantity */
function updateCart({ id, quantity = 1 }: Product): Action {
  return {
    type: '@CART/UPDATE_QUANTITY',
    id,
    quantity,
  };
}

/** Updates a product in cart TO the specified quantity */
function updateCartDirectly({ id, quantity = 0 }: Product): Action {
  return {
    type: '@CART/UPDATE_QUANTITY_DIRECTLY',
    id,
    quantity,
  };
}

/** Empties the cart */
function emptyCart(): Action {
  return {
    type: '@CART/EMPTY',
  };
}

/** Shortcut method to add one quantity to a specified product */
function addOneToCart(id: string | number): Action {
  return updateCart({ id, quantity: 1 });
}

/** Shortcut method to remove one quantity to a specified product */
function removeOneFromCart(id: string | number): Action {
  return updateCart({ id, quantity: -1 });
}

export {
  updateCart,
  updateCartDirectly,
  emptyCart,
  addOneToCart,
  removeOneFromCart,
};
