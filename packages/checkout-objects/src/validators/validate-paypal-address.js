import { stringish } from 'smalldash';
import checkRequired from './check-required';

const validateServerAddress = (address) => {
  const { extendedAddress, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateServerAddress;
