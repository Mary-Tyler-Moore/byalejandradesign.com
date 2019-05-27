import { stringish } from 'smalldash';
import checkRequired from './check-required';

const validateCustomer = (customer) => {
  const invalidFields = checkRequired(customer, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateCustomer;
