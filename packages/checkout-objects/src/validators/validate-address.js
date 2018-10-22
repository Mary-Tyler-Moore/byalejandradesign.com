/** @flow */
import checkRequired from './check-required';
import { stringish } from 'smalldash';
// types
import type { Address } from '../objects';
import type { ValidationResponse, Check } from './types';

/** Checks for required fields in an address */
const validateAddress = (address: Address): ValidationResponse => {
  const { streetAddress2, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateAddress;
