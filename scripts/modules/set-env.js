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

  if (process.env.CIRCLE_BRANCH) {
    const { CIRCLE_BRANCH } = process.env;

    // assign deployment stage based on circle branches
    switch (CIRCLE_BRANCH) {
      case 'production':
        process.env.STAGE = 'production';
        break;
      case 'staging':
        process.env.STAGE = 'staging';
        break;
      default:
        break;
    }
  }

  const stage = process.env.STAGE;

  process.env.GATSBY_INVALIDATE = Date.now();
  process.env.GATSBY_STAGE = stage;

  return stage;
}

module.exports = setEnv;
