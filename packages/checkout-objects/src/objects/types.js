/** @flow */
/**
 * Define types here that don't need default objects
 * Mostly for objects received from other services
 */

import type { PaypalNonce } from './paypal-nonce';
import type { CreditCardNonce } from './credit-card-nonce';

export type Nonce = CreditCardNonce | PaypalNonce;
