/** @flow */
import defaults from './defaults';

export type ServerAddress = {
  +firstName: string,
  +lastName: string,
  +streetAddress: string,
  +extendedAddress: string,
  +locality: string,
  +region: string,
  +postalCode: string,
  +countryCodeAlpha2: string,
};

const serverAddress: ServerAddress = {
  firstName: defaults('', 'Nick'),
  lastName: defaults('', 'Myers'),
  streetAddress: defaults('', '1000 8th St. W'),
  extendedAddress: defaults('', 'Apt. 1C'),
  locality: defaults('', 'Charleston'),
  region: defaults('', 'WV'),
  postalCode: defaults('', '25301'),
  countryCodeAlpha2: defaults('', 'US'),
};

export default serverAddress;
