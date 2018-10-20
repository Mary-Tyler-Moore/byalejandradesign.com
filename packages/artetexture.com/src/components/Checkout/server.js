import axios from 'axios';

const base = () => {
  if (!process.env.GATSBY_BRAINTREE_SERVER) {
    console.warn('You must provide a GATSBY_BRAINTREE_SERVER in .env');
  }

  return process.env.GATSBY_BRAINTREE_SERVER;
};

const server = axios.create({
  baseURL: base(),
});

export default server;