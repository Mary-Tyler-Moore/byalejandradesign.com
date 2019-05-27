import { stringish } from 'smalldash';
import checkFields from './check-fields';

const REQUIRED_FIELDS = [
  'recipientName',
  'line1',
  'city',
  'state',
  'postalCode',
  'countryCode',
];

const validatePaypalAddress = (address) => {
  const invalidFields = checkFields(REQUIRED_FIELDS, address, stringish);

  return {
    valid: Boolean(invalidFields.length < 1),
    fields: invalidFields,
  };
};

export default validatePaypalAddress;
