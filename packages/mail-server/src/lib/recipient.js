const recipient = () => {
  if (!process.env.MAILGUN_RECIPIENT) {
    console.warn('you must supply a recipient in your environment file');
  }

  return process.env.MAILGUN_RECIPIENT;
};

export default recipient;
