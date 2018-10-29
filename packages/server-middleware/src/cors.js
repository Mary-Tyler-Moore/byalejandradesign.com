// @flow
import cors from 'cors';
import domain from './domain';

const corsMiddleware = cors({
  origin: `https://${domain()}`,
  methods: 'POST, GET',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
