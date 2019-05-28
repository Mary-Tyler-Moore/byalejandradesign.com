const path = require('path');

// get environment variables
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

function setEnv() {
  // Define the default STAGE as development
  if (!process.env.STAGE) {
    process.env.STAGE = 'development';
  }

  const stage = process.env.STAGE;

  process.env.GATSBY_INVALIDATE = Date.now();
  process.env.GATSBY_STAGE = stage;

  return stage;
}

module.exports = setEnv;
