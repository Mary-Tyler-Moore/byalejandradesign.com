const path = require('path');
const { spawn } = require('child_process');

const parallel = (...commands) => () =>
  new Promise((res, rej) => {
    const ps = spawn(
      'node',
      [
        path.resolve(__dirname, '../../node_modules/.bin/lerna'),
        ...commands,
        '--parallel',
      ],
      {
        env: process.env,
        stdio: 'inherit',
      }
    );

    ps.on('error', (error) => rej(error));

    res();
  });

module.exports = parallel;
