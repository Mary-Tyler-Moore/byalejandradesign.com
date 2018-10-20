const log = (req, res, next) => {
  console.log('request');
  console.log('url: ', req.url);
  console.log('body: ', req.body);
  next();
};

export default log;
