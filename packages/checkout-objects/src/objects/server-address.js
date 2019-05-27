import defaults from './defaults';

const serverAddress = {
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
