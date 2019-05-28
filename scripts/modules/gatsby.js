const parallel = require('../utils/parallel');
const parallelAsync = require('../utils/parallel-async');

function build() {
  parallel('run', `build`, '--scope', `@byalejandradesign/web`);
}

function watch() {
  return parallelAsync(
    'exec',
    `gatsby develop`,
    '--scope',
    `@byalejandradesign/web`
  );
}

module.exports = {
  build,
  watch,
};
