// @flow
import cors from './cors';
import body from './body-parser';
import auth from './auth';
import secure from './secure';
import responseHeaders from './response-headers';

import type { Middleware } from 'express';

/** export for testing */
export { default as body } from './body-parser';
export { default as cors } from './cors';
export { default as auth } from './auth';
export { default as secure } from './secure';
export { default as responseHeaders } from './response-headers';

/**
 * All of the middleware in order. !IMPORTANT in order.
 * Express will map through and apply these with app.use();
 * @type {array}
 */
const middleware: Array<Middleware> = [
  cors,
  ...body,
  auth,
  secure,
  responseHeaders,
];

export default middleware;
