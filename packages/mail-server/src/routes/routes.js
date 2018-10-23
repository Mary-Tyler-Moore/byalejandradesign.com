// @flow
import fallback from './fallback';
import email from './email';
// types
import type { Router } from 'express';

/**
 * All of the routes in order as an array. !IMPORTANT in order...
 * Express will map through these and apply them with app.use()
 * @type {array}
 */
const routes: Array<Router> = [email, fallback];

export default routes;
