import { stringish } from 'smalldash';
import checkRequired from './check-required';

const validatePaypalAddress = (address) => {
  const { line2, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validatePaypalAddress;
