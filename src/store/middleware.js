import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, compose } from 'redux';
import rootEpic from './root-epic';

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

epicMiddleware.run(rootEpic);

export default compose(applyMiddleware(...middlewares));
