import { nullish } from 'smalldash';

/** returns an array of keys whose fields do not satisfy the callback condition */
const checkRequired = (required, cb = nullish) => {
  return Object.entries(required)
    .filter((entry) => !cb(entry[1]))
    .map((entry) => entry[0]);
};

export default checkRequired;
