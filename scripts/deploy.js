const path = require('path');
const parallel = require('./parallel');

require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

if (!process.env.STAGE) {
  process.env.STAGE = 'staging';
}

const stage = process.env.STAGE;

const prebuilds = [
  'server-env',
  'server-middleware',
  'templates',
  'data-objects',
  'checkout-objects',
  'gatsby-source-wordpress',
];

const servers = ['mail-server', 'checkout-server'];

parallel('run', 'shx', 'rm', '-rf', 'build');

parallel('run', 'build');

parallel(
  'exec',
  `serverless deploy -v --stage ${stage}`,
  '--scope',
  `@byalejandradesign/{${servers.join(',')}}`
);

parallel('exec', `gatsby build`, '--scope', `@byalejandradesign/web`);
