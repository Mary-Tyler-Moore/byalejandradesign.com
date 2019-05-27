import { stringish } from 'smalldash';
import checkRequired from './check-required';

/** Checks for required fields in an address */
const validateAddress = (address) => {
  const { streetAddress2, phone, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateAddress;
