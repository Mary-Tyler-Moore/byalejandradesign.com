/** @flow */
type ValidateEnv = (key: string) => string;

const validateEnv: ValidateEnv = (key) => {
  if (!key) {
    console.warn(`you must supply a ${key} in your environment file`);
    return '';
  }

  return key;
};

export default validateEnv;
