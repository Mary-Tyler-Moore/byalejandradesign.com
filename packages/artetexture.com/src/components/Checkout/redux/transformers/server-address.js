/**
 * Converts a redux address to an address compatiable with the braintree server
 * @param  {object} address
 * @return {object}
 */
const serverAddress = (address) => ({
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
