const path = require('path');
const parallel = require('./parallel');

// get environment variables
// all vars are passed onto the spawn that is created with parallel function
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

// Define the default STAGE as staging
if (!process.env.STAGE) {
  process.env.STAGE = 'staging';
}

process.env.GATSBY_INVALIDATE = Date.now();
const stage = process.env.STAGE;

// big deps
parallel('run', 'build', '--scope', 'gatsby-source-wordpress');

const deps = [
  'checkout-objects',
  'data-objects',
  'server-env',
  'templates',
  'server-middleware',
];
// build dependencies
parallel('run', 'build', '--scope', `@byalejandradesign/{${deps.join(',')}}`);

// build backend apps
const apps = ['mail-server', 'checkout-server'];

parallel('run', 'build', '--scope', `@byalejandradesign/{${apps.join(',')}}`);

// build frontend apps
parallel('exec', `gatsby build`, '--scope', `@byalejandradesign/web`);

// deploy and package with serverless framework
const serverless = ['mail-server', 'checkout-server', 'web'];

parallel(
  'exec',
  `serverless deploy -v --stage ${stage}`,
  '--scope',
  `@byalejandradesign/{${serverless.join(',')}}`
);
