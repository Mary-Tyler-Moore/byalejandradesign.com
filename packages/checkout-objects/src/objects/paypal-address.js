/** @flow */
import defaults from './defaults';

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
  recipientName: defaults('', 'Nick Myers'),
  line1: defaults('', '1000 8th St. W'),
  line2: defaults('', 'Apt. 1C'),
  city: defaults('', 'Charleston'),
  state: defaults('', 'WV'),
  postalCode: defaults('', '25301'),
  countryCode: defaults('', 'US'),
};

export default paypalAddress;
