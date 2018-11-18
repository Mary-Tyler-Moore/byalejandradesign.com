import { createStore, applyMiddleware } from 'redux';
import { throttle } from 'lodash-es';
import reducer from './root-reducer';
import useStorage from './use-storage';
import { loadLocalApplication, saveLocalApplication } from './local-storage';

const REFRESH = 86400 * 1000; // daily
const INVALIDATE = 1542304058142; // Date.now()

const application = loadLocalApplication();
const persistedState = application ? application.state : undefined;

// no date means 0 will automatically invalidate
const stateDate = application ? application.date : 0;

/**
 * Creates object of middlewares so we retain reference to them
 * @return {[type]} [description]
 */
const _middlewares = () => {
  const middlewares = [];

  if (process.env.STAGE === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return middlewares;
};

const _createStore = () => {
  const preloadedState =
    process.env.STAGE !== 'development' &&
    useStorage(REFRESH, INVALIDATE)(stateDate)
      ? persistedState
      : {};

  const middlewares = _middlewares();

  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  // side effects
  if (process.env.STAGE !== 'development') {
    store.subscribe(
      throttle(() => {
        const completeState = store.getState();

        const partialState = {
          cart: completeState.cart,
          checkout: {
            billingAddress: completeState.checkout.billingAddress,
            shippingAddress: completeState.checkout.shippingAddress,
          },
        };

        const application = {
          state: partialState,
          date: Date.now(),
        };

        saveLocalApplication(application);
      }),
      1000
    );
  }

  return store;
};

export default _createStore;
