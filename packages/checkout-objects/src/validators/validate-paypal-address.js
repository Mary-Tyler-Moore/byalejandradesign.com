/** @flow */
import checkRequired from './check-required';
// types
import type { ServerAddress } from '../objects';
import type { ValidationResponse } from './types';

const validateServerAddress = (address: ServerAddress): ValidationResponse => {
  const { extendedAddress, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateServerAddress;
