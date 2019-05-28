const parallel = require('../utils/parallel');
const parallelAsync = require('../utils/parallel-async');

const DEPENDENCIES = [
  'checkout-objects',
  'data-objects',
  'server-env',
  'templates',
  'server-middleware',
];

function watch() {
  return parallelAsync(
    'run',
    'watch',
    '--scope',
    `@byalejandradesign/{${DEPENDENCIES.join(',')}}`
  );
}

function build() {
  parallel(
    'run',
    'build',
    '--scope',
    `@byalejandradesign/{${DEPENDENCIES.join(',')}}`
  );
}

module.exports = {
  DEPENDENCIES,
  watch,
  build,
};
