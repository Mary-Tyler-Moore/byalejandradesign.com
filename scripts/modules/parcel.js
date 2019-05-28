const parallel = require('../utils/parallel');
const parallelAsync = require('../utils/parallel-async');

const APPS = ['mail-server', 'checkout-server'];

function watch() {
  return parallelAsync(
    'run',
    'watch',
    '--scope',
    `@byalejandradesign/{${APPS.join(',')}}`
  );
}

function build() {
  parallel('run', 'build', '--scope', `@byalejandradesign/{${APPS.join(',')}}`);
}

module.exports = {
  build,
  watch,
  APPS,
};
