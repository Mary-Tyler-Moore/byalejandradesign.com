const setEnv = require('./set-env');
const parallel = require('../utils/parallel');

const SERVERLESS = ['mail-server', 'checkout-server', 'web'];

let packaged = false;

function packager() {
  const stage = setEnv();

  parallel(
    'exec',
    `serverless package --stage ${stage}`,
    '--scope',
    `@byalejandradesign/{${SERVERLESS.join(',')}}`
  );

  packaged = true;
}

function deploy() {
  const stage = setEnv();

  if (!packaged) {
    packager();
  }

  parallel(
    'exec',
    `serverless deploy -v --stage ${stage}`,
    '--scope',
    `@byalejandradesign/{${SERVERLESS.join(',')}}`
  );
}

module.exports = {
  SERVERLESS,
  packager,
  deploy,
};
