/** @flow */
import checkRequired from './check-required';
import { stringish } from 'smalldash';
// types
import type { Customer } from '../objects';
import type { ValidationResponse } from './types';

const validateCustomer = (customer: Customer): ValidationResponse => {
  const invalidFields = checkRequired(customer, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateCustomer;
