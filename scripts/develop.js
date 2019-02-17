const path = require('path');
const parallel = require('./parallel-async');
const { pipeAsync } = require('smalldash');

// get environment variables
// all vars are passed onto the spawn that is created with parallel function
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

// Define the default STAGE as development
if (!process.env.STAGE) {
  process.env.STAGE = 'development';
}

const stage = process.env.STAGE;

process.env.GATSBY_INVALIDATE = Date.now();
process.env.GATSBY_STAGE = stage;

const throttler = (...args) =>
  new Promise((res, rej) => {
    const timeout = 2000;
    setTimeout(() => res(...args), timeout);
  });

const deps = [
  'checkout-objects',
  'data-objects',
  'server-env',
  'templates',
  'server-middleware',
];

// watch backend apps
const apps = ['mail-server', 'checkout-server'];

// watch deps
const pipeline = pipeAsync(
  parallel(
    'run',
    'watch',
    '--scope',
    '@byalejandradesign/gatsby-source-wordpress'
  ),
  throttler,
  parallel('run', 'watch', '--scope', `@byalejandradesign/{${deps.join(',')}}`),
  throttler,
  parallel('run', 'watch', '--scope', `@byalejandradesign/{${apps.join(',')}}`),
  throttler,
  parallel('exec', `gatsby develop`, '--scope', `@byalejandradesign/web`)
);

pipeline();
