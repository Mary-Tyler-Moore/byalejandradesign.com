import paypalAddress from './paypal-address';

const paypalNonce = {
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
