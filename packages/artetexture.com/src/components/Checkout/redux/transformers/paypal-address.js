/** @flow */
import type { Address, PaypalAddress } from 'checkout';

/** Converts a redux address to an address compatible with paypal */
const paypalAddress = (address: Address): PaypalAddress => ({
  recipientName: `${address.firstName} ${address.lastName}`,
  line1: address.streetAddress1,
  line2: address.streetAddress2,
  city: address.city,
  state: address.province,
  postalCode: address.postalCode,
  countryCode: address.countryCode,
});

export default paypalAddress;
