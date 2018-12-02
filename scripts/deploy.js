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

const serverless = ['mail-server', 'checkout-server', 'web'];

// build dependencies
parallel('run', 'build');

// build frontend
parallel('exec', `gatsby build`, '--scope', `@byalejandradesign/web`);
//
// // deploy and package with serverless framework
parallel(
  'exec',
  `serverless deploy -v --stage ${stage}`,
  '--scope',
  `@byalejandradesign/{${serverless.join(',')}}`
);
