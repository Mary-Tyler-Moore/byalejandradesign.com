import dotenv from 'dotenv';
import express from 'express';
import serverless from 'serverless-http';
import middleware from './middleware';
import routes from './routes';

dotenv.config();

const app = express();
// Apply all middlewares to array
middleware.forEach((each) => app.use(each));
// Apply all routes to array
routes.forEach((route) => route(app));
// export for serverless
module.exports.handler = serverless(app);
