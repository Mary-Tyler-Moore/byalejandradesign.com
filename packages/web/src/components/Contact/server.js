import axios from 'axios';

const stage = process.env.GATSBY_STAGE;
const KEY = stage.toUpperCase();

const base = () => {
  if (!process.env[`GATSBY_MAIL_SERVER_${KEY}`]) {
    console.warn(`You must provide a GATSBY_MAIL_SERVER_${KEY} in .env`);
  }

  return process.env[`GATSBY_MAIL_SERVER_${KEY}`];
};

const key = () => {
  if (!process.env[`GATSBY_API_KEY_${KEY}`]) {
    console.warn(`You must provide a GATSBY_API_KEY_${KEY} in .env`);
  }

  return process.env[`GATSBY_API_KEY_${KEY}`];
};

const server = axios.create({
  baseURL: base(),
  headers: {
    Authorization: key(),
  },
});

export default server;
