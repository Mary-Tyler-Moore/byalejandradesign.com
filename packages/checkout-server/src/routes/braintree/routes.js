/** @flow */
import express from 'express';
import gateway from './gateway';
import checkout from './checkout';
import token from './client-token';
// types
import type { Router, $Request, $Response } from 'express';
// initialize router
const router: Router = express.Router();

router.get('/client_token', token);
router.post('/submit', checkout);

export default router;
