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

const deps = [
  'checkout-objects',
  'data-objects',
  'server-env',
  'templates',
  'server-middleware',
];

// build dependencies
parallel('run', 'build', '--scope', `@byalejandradesign/{${deps.join(',')}}`);
