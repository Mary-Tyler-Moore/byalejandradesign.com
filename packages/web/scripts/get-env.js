const path = require('path');
const getStage = require('./get-stage');

const getEnv = () => {
  const stage = getStage();

  try {
    require('dotenv').config(path.resolve(__dirname, '../.env'));
  } catch (e) {
    console.log(`no environment file specified`);
  }
};

module.exports = getEnv;
