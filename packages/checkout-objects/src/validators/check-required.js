import { nullish } from 'smalldash';

type Check = (value: mixed) => boolean;
type CheckRequired = <T: {}>(param: typeof T, cb: Check) => $Keys<T>;

/** returns an array of keys whose fields do not satisfy the callback condition */
const checkRequired: CheckRequired = (required, cb = nullish) => {
  return Object.entries(required)
    .filter((entry) => !cb(entry[1]))
    .map((entry) => entry[0]);
};

export default checkRequired;
