/** @flow */
import checkRequired from './check-required';
// types
import type { PaypalAddress } from '../objects';
import type { ValidationResponse } from './types';

const validatePaypalAddress = (address: PaypalAddress): ValidationResponse => {
  const { line2, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validatePaypalAddress;
