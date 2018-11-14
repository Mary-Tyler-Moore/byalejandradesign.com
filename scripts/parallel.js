const path = require('path');
const util = require('util');

const spawn = require('child_process').spawnSync;

const parallel = (...commands) =>
  spawn(
    'node',
    [
      path.resolve(__dirname, '../node_modules/.bin/lerna'),
      ...commands,
      '--parallel',
    ],
    {
      env: process.env,
      stdio: 'inherit',
    }
  );

module.exports = parallel;
