/** @flow */
import safeEnv from './safe-env';

const safeStage = (): string => {
  const mightExist = safeEnv('STAGE')();

  return mightExist ? mightExist : 'development';
};

export default safeStage;
