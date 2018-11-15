const getStage = () => {
  const stage = process.env.STAGE || 'development';

  if (!stage) {
    console.warn(
      'You did not specify STAGE env variable. Defaulting to development'
    );
  }

  // forward staging varible to front end injection
  process.env.GATSBY_STAGE = stage;

  return stage;
};

module.exports = getStage;
