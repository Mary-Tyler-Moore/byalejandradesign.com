// @flow
import cors from './cors';
import body from './body-parser';
import auth from './auth';
import secure from './secure';
import responseHeaders from './response-headers';

import type { Middleware } from 'express';

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
