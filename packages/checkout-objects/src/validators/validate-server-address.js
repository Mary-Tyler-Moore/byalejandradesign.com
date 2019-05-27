import { stringish } from 'smalldash';
import checkFields from './check-fields';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'streetAddress',
  'locality',
  'region',
  'postalCode',
  'countryCodeAlpha2',
];

const validateServerAddress = (address) => {
  const invalidFields = checkFields(REQUIRED_FIELDS, address, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validateServerAddress;
