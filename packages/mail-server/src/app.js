// @flow
import express from 'express';
import serverless from 'serverless-http';
// routes and middleware
import routes from './routes';
import middleware from '@artetexture/server-middleware';
// initialize app
const app = express();
// add static build files
app.use('/static', express.static('build/static'));
// apply all middleware
middleware.forEach((middlware) => app.use(middlware));
// apply all top level routes
routes.forEach((router) => app.use('/', router));
// export final route like this instead of using export for serverless
module.exports.handler = serverless(app);
