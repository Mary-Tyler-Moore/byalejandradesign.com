// @flow
import cors from 'cors';
import env from '@byalejandradesign/server-env';
import whitelist from './whitelist';

const corsMiddleware = cors({
  origin: env.STAGE === 'development' ? '*' : whitelist.map((fn) => fn()),
  methods: ['POST, GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
