/** @flow */
type SafeEnv = (key: string) => () => string;

const safeEnv: SafeEnv = (key) => (): string => {
  if (!process.env[key]) {
    console.warn(`you must supply a ${key} in your environment file`);
    return '';
  }

  return process.env[key];
};

export default safeEnv;
