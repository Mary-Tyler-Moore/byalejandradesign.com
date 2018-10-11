/**
 * Converts a redux address to an address compatible with paypal
 * @param  {object} address
 * @return {object}
 */
const paypalAddress = (address) => ({
  recipientName: `${address.firstName} ${address.lastName}`,
  line1: address.streetAddress1,
  line2: address.streetAddress2,
  city: address.city,
  state: address.province,
  postalCode: address.postalCode,
  countryCode: address.countryCode,
});

export default paypalAddress;
