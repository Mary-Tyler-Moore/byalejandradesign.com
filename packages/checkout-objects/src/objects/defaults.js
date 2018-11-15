/** @flow */
type Defaults = <A, B>(prod: A, dev: B) => A | B;

const defaults: Defaults = (prod, dev) =>
  process.env.STAGE === 'production' || process.env.STAGE === 'staging'
    ? prod
    : dev;

export default defaults;
