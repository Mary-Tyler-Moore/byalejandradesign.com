import axios from 'axios';
import { MAIL_DOMAIN, API_KEY } from '@byalejandradesign/server-env';

const server = axios.create({
  baseURL: MAIL_DOMAIN,
  headers: {
    Authorization: API_KEY,
  },
});

export default server;
