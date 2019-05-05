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

const stage = process.env.STAGE;

process.env.GATSBY_INVALIDATE = Date.now();
process.env.GATSBY_STAGE = stage;

// big deps
parallel(
  'run',
  'build',
  '--scope',
  '@byalejandradesign/gatsby-source-wordpress'
);

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
const gatsby = parallel('run', `build`, '--scope', `@byalejandradesign/web`);

gatsby.on('error', (err) => {
  console.error(error);
  process.exit();
});

// package with serverless framework
const serverless = ['mail-server', 'checkout-server', 'web'];

parallel(
  'exec',
  `serverless package --stage ${stage}`,
  '--scope',
  `@byalejandradesign/{${serverless.join(',')}}`
);
