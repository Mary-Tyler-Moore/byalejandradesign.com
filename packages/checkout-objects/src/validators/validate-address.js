import { stringish } from 'smalldash';
import checkFields from './check-fields';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'streetAddress1',
  'city',
  'countryCode',
  'postalCode',
  'province',
];

/** Checks for required fields in an address */
const validateAddress = (address) => {
  const invalidFields = checkFields(REQUIRED_FIELDS, address, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateAddress;
