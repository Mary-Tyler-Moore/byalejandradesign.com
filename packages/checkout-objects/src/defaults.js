/** @flow */
type Defaults = <A, B>(prod: A, dev: B) => A | B;

const defaults: Defaults = (prod, dev) =>
  process.env.NODE_ENV !== 'production' ? dev : prod;

export default defaults;
