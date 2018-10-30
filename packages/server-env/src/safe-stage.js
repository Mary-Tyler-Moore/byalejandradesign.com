/** @flow */
import validateEnv from './validate-env';

const safeStage = (): string => {
  const mightExist = validateEnv('STAGE');

  return mightExist ? mightExist : 'development';
};

export default safeStage;
