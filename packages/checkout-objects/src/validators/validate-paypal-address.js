/** @flow */
import checkRequired from './check-required';
import { stringish } from 'smalldash';
// types
import type { ServerAddress } from '../objects';
import type { ValidationResponse, Check } from './types';

const validateServerAddress = (address: ServerAddress): ValidationResponse => {
  const { extendedAddress, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateServerAddress;
