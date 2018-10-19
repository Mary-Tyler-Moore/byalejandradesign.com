/** @flow */
import defaults from './defaults';

export type Address = {
  +firstName: string,
  +lastName: string,
  +streetAddress1: string,
  +streetAddress2: string,
  +city: string,
  +countryCode: string,
  // everything is postalCode for easier use
  +postalCode: string,
  // everything is province for easier use
  +province: string,
  +phone: string,
};

const address: Address = {
  firstName: defaults('', 'Nick'),
  lastName: defaults('', 'Myers'),
  streetAddress1: defaults('', '1000 8th St. W'),
  streetAddress2: defaults('', 'Apt. 1C'),
  city: defaults('', 'Charleston'),
  // must define default country **important**
  countryCode: defaults('US', 'US'),
  postalCode: defaults('', '25301'),
  province: defaults('', 'WV'),
  phone: defaults('', '516-123-1230'),
};

export default address;
