
const base = () => {
  if (!process.env.GATSBY_BRAINTREE_SERVER) {
    throw new Error('You must provide a GATSBY_BRAINTREE_SERVER in .env');
  }

  return process.env.GATSBY_BRAINTREE_SERVER;
};

export default base;
