/** @flow */
import type { Address, ServerAddress } from '../objects';

/** Converts a redux address to an address compatiable with the braintree server */
function addressToServerAddress(address: Address): ServerAddress {
  return {
    firstName: address.firstName,
    lastName: address.lastName,
    streetAddress: address.streetAddress1,
    extendedAddress: address.streetAddress2,
    locality: address.city,
    region: address.province,
    postalCode: address.postalCode,
    countryCodeAlpha2: address.countryCode,
  };
}

export default addressToServerAddress;
