/** @flow */
type Defaults = <A, B>(prod: A, dev: B) => A | B;

const defaults: Defaults = (prod, dev) => {
  const stage = process.env.STAGE
    ? process.env.STAGE
    : process.env.GATSBY_STAGE
    ? process.env.GATSBY_STAGE
    : 'development';

  return stage === 'production' || stage === 'staging' ? prod : dev;
};

export default defaults;
