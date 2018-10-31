/** @flow */
import express from 'express';
import orderConfirmation from './order-confirmation';
import contact from './contact';
// types
import type { Router, $Request, $Response } from 'express';
// initialize router
const router: Router = express.Router();

router.post('/order-confirmation', orderConfirmation);
router.post('/contact', contact);

export default router;
