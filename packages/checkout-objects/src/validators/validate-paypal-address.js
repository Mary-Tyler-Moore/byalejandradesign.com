/** @flow */
import checkRequired from './check-required';
// types
import type { ServerAddress } from '../objects';
import type { ValidationResponse, Check } from './types';

const validateServerAddress = (
  address: ServerAddress,
  cb: Check
): ValidationResponse => {
  const { extendedAddress, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, cb);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateServerAddress;
