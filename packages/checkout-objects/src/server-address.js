/** @flow */
export type ServerAddress = {
  firstName: string,
  lastName: string,
  streetAddress: string,
  extendedAddress: string,
  locality: string,
  region: string,
  postalCode: string,
  countryCodeAlpha2: string,
};

const serverAddress: ServerAddress = {
  firstName: '',
  lastName: '',
  streetAddress: '',
  extendedAddress: '',
  locality: '',
  region: '',
  postalCode: '',
  countryCodeAlpha2: '',
};

export default serverAddress;
