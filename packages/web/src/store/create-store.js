import { createStore, applyMiddleware } from 'redux';
import { throttle } from 'lodash-es';
import reducer from './root-reducer';
import useStorage from './use-storage';
import { loadLocalApplication, saveLocalApplication } from './local-storage';

const REFRESH = 86400 * 1000; // daily
const INVALIDATE = 1521761285634; // Date.now()

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

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return middlewares;
};

const _createStore = () => {
  const preloadedState =
    process.env.NODE_ENV !== 'development' &&
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
  if (process.env.NODE_ENV !== 'development') {
    store.subscribe(
      throttle(() => {
        const application = {
          state: store.getState(),
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
