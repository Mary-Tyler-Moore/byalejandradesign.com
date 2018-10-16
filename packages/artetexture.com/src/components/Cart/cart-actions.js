/** @flow */
type $ExtractReturn<Fn> = $Call<<T>((...Array<any>) => T) => T, Fn>;

/** params needed for an update action */
export type Product = {
  /** id number or string */
  +id: string | number,
  /** number of quantity */
  +quantity: number,
};

/** Updates a product in cart BY the specified quantity */
function updateCart({ id, quantity = 1 }: Product) {
  return {
    type: '@CART/UPDATE_QUANTITY',
    id,
    quantity,
  };
}

/** Updates a product in cart TO the specified quantity */
function updateCartDirectly({ id, quantity = 0 }: Product) {
  return {
    type: '@CART/UPDATE_QUANTITY_DIRECTLY',
    id,
    quantity,
  };
}

/** Empties the cart */
function emptyCart() {
  return {
    type: '@CART/EMPTY',
  };
}

/** Shortcut method to add one quantity to a specified product */
function addOneToCart(id: string | number) {
  return updateCart({ id, quantity: 1 });
}

/** Shortcut method to remove one quantity to a specified product */
function removeOneFromCart(id: string | number) {
  return updateCart({ id, quantity: -1 });
}

export type Action =
  | $ExtractReturn<typeof updateCart>
  | $ExtractReturn<typeof updateCartDirectly>
  | $ExtractReturn<typeof emptyCart>;

export {
  updateCart,
  updateCartDirectly,
  emptyCart,
  addOneToCart,
  removeOneFromCart,
};
