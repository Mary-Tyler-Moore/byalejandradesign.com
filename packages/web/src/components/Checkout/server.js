import axios from 'axios';

const base = () => {
  if (!process.env.GATSBY_BRAINTREE_SERVER) {
    console.warn('You must provide a GATSBY_BRAINTREE_SERVER in .env');
  }

  return process.env.GATSBY_BRAINTREE_SERVER;
};

const key = () => {
  if (!process.env.GATSBY_API_KEY) {
    console.warn('You must provide a GATSBY_API_KEY in .env');
  }

  return process.env.GATSBY_API_KEY;
};

const server = axios.create({
  baseURL: base(),
  headers: {
    Authorization: key(),
  },
});

export default server;
