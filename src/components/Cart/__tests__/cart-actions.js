import { combineReducers, createStore } from 'redux';
import cartReducer from '../cart-reducer';
import { updateCartQuantity, updateCartQuantityDirectly, emptyCart } from '../cart-actions';

const store = createStore(combineReducers({ cart: cartReducer }));

test('It adds one quantity correctly', () => {
    store.dispatch(updateCartQuantity({ id: 10, quantity: 1 }));
    expect(store.getState().cart.products[0]).toMatchObject({ id: 10, quantity: 1 });
});

test('It adds another one quantity correctly', () => {
    store.dispatch(updateCartQuantity({ id: 10, quantity: 1 }));
    expect(store.getState().cart.products[0]).toMatchObject({ id: 10, quantity: 2 });
});

test('It subtracts one quantity correctly', () => {
    store.dispatch(updateCartQuantity({ id: 10, quantity: -1 }));
    expect(store.getState().cart.products[0]).toMatchObject({ id: 10, quantity: 1 });
});

test('It adds another product correctly', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: 1 }));
    expect(store.getState().cart.products.find((product) => product.id === 11)).toMatchObject({
        id: 11,
        quantity: 1,
    });
});

test('It updates the second product correctly', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: 1 }));
    expect(store.getState().cart.products.find((product) => product.id === 11)).toMatchObject({
        id: 11,
        quantity: 2,
    });
});

test('It updates the second product correctly by adding more then 1', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: 4 }));
    expect(store.getState().cart.products.find((product) => product.id === 11)).toMatchObject({
        id: 11,
        quantity: 6,
    });
});

test('It updates the second product by removing more then 1', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: -5 }));
    expect(store.getState().cart.products.find((product) => product.id === 11)).toMatchObject({
        id: 11,
        quantity: 1,
    });
});

test('It removes the second product by updating quantity to below 0', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: -1 }));
    expect(store.getState().cart.products[0]).toMatchObject({ id: 10, quantity: 1 });
    expect(store.getState().cart.products.length).toBe(1);
});

test('It adds a second product by updating quantity directly', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: 10 }));
    expect(store.getState().cart.products.find((product) => product.id === 11)).toMatchObject({
        id: 11,
        quantity: 10,
    });
});

test('It empties the cart', () => {
    store.dispatch(emptyCart());
    expect(store.getState().cart.products.length).toBe(0);
});

test('It updates total quantity', () => {
    store.dispatch(updateCartQuantity({ id: 11, quantity: 10 }));
    store.dispatch(updateCartQuantity({ id: 12, quantity: 10 }));
    expect(store.getState().cart.totalQuantity).toBe(20);
});
