// @flow
import cors from 'cors';
import env from '@byalejandradesign/server-env';

const domains: Array<RegExp> = [/byalejandradesign\.com$/];

const corsMiddleware = cors({
  origin: env.STAGE === 'development' ? '*' : domains,
  methods: ['POST, GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
