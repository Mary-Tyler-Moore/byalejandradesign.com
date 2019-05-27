import { nullish } from 'smalldash';

const checkFields = (fields = [], object = {}, check = nullish) => {
  return fields.filter((field) => !check(object[field]));
};

export default checkFields;
