// @flow
import cors from 'cors';
import env from '@byalejandradesign/server-env';

const domains: Array<string> = [
  'https://byalejandradesign.com',
  'https://byalejandradesign.netlify.com',
  'https://staging.byalejandradesign.com',
  'https://staging--byalejandradesign.netlify.com',
];

const corsMiddleware = cors({
  origin: env.STAGE !== 'development' ? domains : '*',
  methods: 'POST, GET',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
