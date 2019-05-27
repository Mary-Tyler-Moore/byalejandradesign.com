import { stringish } from 'smalldash';
import checkFields from './check-fields';

const REQUIRED_FIELDS = ['email', 'firstName', 'lastName', 'phone'];

const validateCustomer = (customer) => {
  const invalidFields = checkFields(REQUIRED_FIELDS, customer, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateCustomer;
