/** @flow */
import checkRequired from './check-required';
// types
import type { Customer } from '../objects';
import type { ValidationResponse } from './types';

const validateCustomer = (customer: Customer): ValidationResponse => {
  const invalidFields = checkRequired(customer);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateCustomer;
