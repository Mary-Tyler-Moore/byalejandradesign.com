// @flow
import fallback from './fallback';
import braintree from './braintree/routes';
// import address from './address/routes';
// types
import type { Router } from 'express';

/**
 * All of the routes in order as an array. !IMPORTANT in order...
 * Express will map through these and apply them with app.use()
 * @type {array}
 */
const routes: Array<Router> = [braintree, fallback];

export default routes;
