/** @flow */
import checkRequired from './check-required';
// types
import type { PaypalAddress } from '../objects';
import type { ValidationResponse, Check } from './types';

const validatePaypalAddress = (
  address: PaypalAddress,
  cb: Check
): ValidationResponse => {
  const { line2, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, cb);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validatePaypalAddress;
