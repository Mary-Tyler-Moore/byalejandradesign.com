// @flow
// import './env';
import express from 'express';
import serverless from 'serverless-http';
// routes and middleware
import routes from './routes';
import middleware from './middleware';
// initialize app
const app = express();
// apply all middleware
middleware.forEach((middlware) => app.use(middlware));
// apply all top level routes
routes.forEach((router) => app.use('/', router));
// export final route like this instead of using export for serverless
module.exports.handler = serverless(app);
