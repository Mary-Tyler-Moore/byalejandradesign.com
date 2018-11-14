const getStage = () =>
  process.env.STAGE || process.env.NODE_ENV || 'development';

module.exports = getStage;
