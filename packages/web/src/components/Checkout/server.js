import axios from 'axios';
import { CHECKOUT_DOMAIN, API_KEY } from '@byalejandradesign/server-env';

const verify = (key) => {
  if (!key) {
    console.warn('You are missing an API_KEY');
  }
};

verify(CHECKOUT_DOMAIN);
verify(API_KEY);

const server = axios.create({
  baseURL: CHECKOUT_DOMAIN,
  headers: {
    Authorization: API_KEY,
  },
});

export default server;
