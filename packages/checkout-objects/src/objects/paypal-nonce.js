/** @flow */
import paypalAddress from './paypal-address';
import type { PaypalAddress } from './paypal-address';

export type PaypalNonce = {
  +details: {
    +countryCode: string,
    +email: string,
    +firstName: string,
    +lastName: string,
    +payerId: string,
  },
  +shippingAddress: PaypalAddress,
  +nonce: string,
  +type: 'PayPalAccount',
};

const paypalNonce: PaypalNonce = {
  details: {
    countryCode: '',
    email: '',
    firstName: '',
    lastName: '',
    payerId: '',
  },
  shippingAddress: paypalAddress,
  nonce: '',
  type: 'PayPalAccount',
};

export default paypalNonce;
