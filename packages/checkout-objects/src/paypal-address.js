/** @flow */
export type PaypalAddress = {
  +recipientName: string,
  +line1: string,
  +line2: string,
  +city: string,
  +state: string,
  +postalCode: string,
  +countryCode: string,
};

const paypalAddress: PaypalAddress = {
  recipientName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  countryCode: '',
};

export default paypalAddress;
