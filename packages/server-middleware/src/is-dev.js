/** @flow */

const isDev = (): boolean %checks => process.env.STAGE === 'development';

export default isDev;
