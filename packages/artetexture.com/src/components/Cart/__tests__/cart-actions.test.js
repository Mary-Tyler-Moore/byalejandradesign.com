import { combineReducers, createStore } from 'redux';
import cartReducer from '../cart-reducer';
import {
  updateCart,
  updateCartDirectly,
  emptyCart,
} from '../cart-actions';

const store = createStore(combineReducers({ cart: cartReducer }));

describe('it reduces correctly', () => {
  test('It adds one quantity correctly', () => {
    store.dispatch(updateCart({ id: 10, quantity: 1 }));
    expect(store.getState().cart.products[0]).toMatchObject({
      id: 10,
      quantity: 1,
    });
  });

  test('It adds another one quantity correctly', () => {
    store.dispatch(updateCart({ id: 10, quantity: 1 }));
    expect(store.getState().cart.products[0]).toMatchObject({
      id: 10,
      quantity: 2,
    });
  });

  test('It subtracts one quantity correctly', () => {
    store.dispatch(updateCart({ id: 10, quantity: -1 }));
    expect(store.getState().cart.products[0]).toMatchObject({
      id: 10,
      quantity: 1,
    });
  });

  test('It adds another product correctly', () => {
    store.dispatch(updateCart({ id: 11, quantity: 1 }));
    expect(
      store.getState().cart.products.find((product) => product.id === 11)
    ).toMatchObject({
      id: 11,
      quantity: 1,
    });
  });

  test('It updates the second product correctly', () => {
    store.dispatch(updateCart({ id: 11, quantity: 1 }));
    expect(
      store.getState().cart.products.find((product) => product.id === 11)
    ).toMatchObject({
      id: 11,
      quantity: 2,
    });
  });

  test('It updates the second product correctly by adding more then 1', () => {
    store.dispatch(updateCart({ id: 11, quantity: 4 }));
    expect(
      store.getState().cart.products.find((product) => product.id === 11)
    ).toMatchObject({
      id: 11,
      quantity: 6,
    });
  });

  test('It updates the second product by removing more then 1', () => {
    store.dispatch(updateCart({ id: 11, quantity: -5 }));
    expect(
      store.getState().cart.products.find((product) => product.id === 11)
    ).toMatchObject({
      id: 11,
      quantity: 1,
    });
  });

  test('It removes the second product by updating quantity to below 0', () => {
    store.dispatch(updateCart({ id: 11, quantity: -1 }));
    expect(store.getState().cart.products[0]).toMatchObject({
      id: 10,
      quantity: 1,
    });
    expect(store.getState().cart.products.length).toBe(1);
  });

  test('It adds a second product by updating quantity directly', () => {
    store.dispatch(updateCartDirectly({ id: 11, quantity: 10 }));

    const products = store.getState().cart.products;

    expect(products.length).toBe(2);
    expect(products.find((product) => product.id === 11)).toMatchObject({
      id: 11,
      quantity: 10,
    });
  });

  test('It adds a third product by updating quantity directly', () => {
    store.dispatch(updateCartDirectly({ id: 12, quantity: 2 }));

    const products = store.getState().cart.products;

    expect(products.length).toBe(3);
    expect(products.find((product) => product.id === 12)).toMatchObject({
      id: 12,
      quantity: 2,
    });
  });

  test('It empties the cart', () => {
    store.dispatch(emptyCart());
    expect(store.getState().cart.products.length).toBe(0);
  });

  test('It updates total quantity', () => {
    store.dispatch(updateCart({ id: 11, quantity: 10 }));
    store.dispatch(updateCart({ id: 12, quantity: 10 }));
    expect(store.getState().cart.totalQuantity).toBe(20);
  });
});
