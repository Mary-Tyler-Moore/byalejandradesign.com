/** @flow */
import checkRequired from './check-required';
import { stringish } from 'smalldash';
// types
import type { PaypalAddress } from '../objects';
import type { ValidationResponse, Check } from './types';

const validatePaypalAddress = (address: PaypalAddress): ValidationResponse => {
  const { line2, ...requiredFields } = address;

  const invalidFields = checkRequired(requiredFields, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validatePaypalAddress;
