/** @flow */
import type { Address, ServerAddress } from '../objects';

/** Converts a redux address to an address compatiable with the braintree server */
const serverAddress = (address: Address): ServerAddress => ({
  firstName: address.firstName,
  lastName: address.lastName,
  streetAddress: address.streetAddress1,
  extendedAddress: address.streetAddress2,
  locality: address.city,
  region: address.province,
  postalCode: address.postalCode,
  countryCodeAlpha2: address.countryCode,
});

export default serverAddress;
