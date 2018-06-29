// @flow
const base = () => {
  if (!process.env.BRAINTREE_SERVER) {
    throw new Error('You must provide a BRAINTREE_SERVER in .env');
  }

  return process.env.BRAINTREE_SERVER;
};

export default base;
