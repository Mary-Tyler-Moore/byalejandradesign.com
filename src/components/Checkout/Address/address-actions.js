export const updateAddressField = ({ slice, payload, key } = {}) => ({
  type: 'UPDATE_ADDRESS_FIELD',
  slice,
  payload,
  key,
});

export const validateAddress = () => ({ type: 'VALIDATE_ADDRESS' });
