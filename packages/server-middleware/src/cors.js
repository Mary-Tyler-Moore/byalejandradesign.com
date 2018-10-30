// @flow
import cors from 'cors';
import env from '@byalejandradesign/server-env';

const corsMiddleware = cors({
  // $FlowFixMe
  origin: env.ROOT_DOMAIN,
  methods: 'POST, GET',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
