/**
 * Updates a product in cart BY the specified quantity
 * @param {string} id the id number of the product to update
 * @param {number} quantity the amount  by which to increase the quantity
 */
export const updateCartQuantity = ({ id, quantity = 1 } = {}) => ({
  type: 'CART_UPDATE_QUANTITY',
  id,
  quantity,
});

/**
 * Updates a product in cart TO the specified quantity
 * @param {string} id the id number of the product to update
 * @param {number} quantity the desired quantity amount
 */
export const updateCartQuantityDirectly = ({ id, quantity = 0 } = {}) => ({
  type: 'CART_UPDATE_QUANTITY_DIRECTLY',
  id,
  quantity,
});

/**
 * Empties the cart
 */
export const emptyCart = () => ({ type: 'CART_EMPTY' });

/**
 * Shortcut method to add one quantity to a specified product
 * @param {string} id the id of the product to update
 */
export const addOneToCart = (id) => updateCartQuantity({ id, quantity: 1 });

/**
 * Shortcut method to remove one quantity to a specified product
 * @param {string} id the id of the product to update
 */
export const removeOneFromCart = (id) =>
  updateCartQuantity({ id, quantity: -1 });
