const domain = () => {
  if (!process.env.DOMAIN) {
    console.warn('you must supply a domain in your environment file');
  }

  return process.env.DOMAIN;
};

export default domain;
