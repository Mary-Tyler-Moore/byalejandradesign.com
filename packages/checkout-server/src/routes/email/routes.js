/** @flow */
import express from 'express';
import orderConfirmation from './order-confirmation';
// types
import type { Router, $Request, $Response } from 'express';
// initialize router
const router: Router = express.Router();

router.post('/email/order-confirmation', orderConfirmation);

export default router;
