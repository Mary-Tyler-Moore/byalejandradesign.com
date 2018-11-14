const path = require('path');
const getStage = require('./get-stage');

const getEnv = () => {
  const stage = getStage();

  try {
    require('dotenv').config({
      path: path.resolve(__dirname, `../.env.${stage}`),
    });
  } catch (e) {
    console.log(`no enivornment file for the stage: ${stage} specified`);
  }
};

module.exports = getEnv;
