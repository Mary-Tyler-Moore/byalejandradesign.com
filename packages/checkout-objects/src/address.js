/** @flow */
export type Address = {
  +firstName: string,
  +lastName: string,
  +streetAddress1: string,
  +streetAddress2: string,
  +city: string,
  +countryCode: string,
  +postalCode: string,
  +province: string,
  +phone: string,
};

const address: Address = {
  firstName: '',
  lastName: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  countryCode: '',
  postalCode: '',
  province: '',
  phone: '',
};

export default address;
