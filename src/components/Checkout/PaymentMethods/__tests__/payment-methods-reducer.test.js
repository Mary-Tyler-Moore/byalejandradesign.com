import configureStore from 'redux-mock-store';

describe('testing payment method actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('it dispatches actions', () => {
    const action = { type: 'ACTION' };

    store.dispatch(action);
    expect(store.getActions()).toMatchObject([action]);
  });

  test('it does async actions', () => {});
});
