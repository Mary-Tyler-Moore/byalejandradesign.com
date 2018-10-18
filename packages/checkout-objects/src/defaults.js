/** @flow */
function defaults<T, A>(prod: T, dev: A): T | A {
  return process.env.NODE_ENV !== 'production' ? dev : prod;
}

export default defaults;
