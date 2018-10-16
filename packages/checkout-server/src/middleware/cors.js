// @flow
import cors from 'cors';

const origins = ['https://artetexture.netlify.com'];

const corsMiddleware = cors({
  origin: origins,
  methods: 'POST, GET',
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
