/** @flow */
import path from 'path';
import dotEnv from 'dotenv';
import safeEnv from './safe-env';
import safeStage from './safe-stage';
import normalizeDomain from './normalize-domain';
// get node env
const nodeEnv = safeEnv('NODE_ENV');
// get stage
const stage = safeStage();
// start dotenv
dotEnv.config({
  // $FlowFixMe
  path: path.resolve(__dirname, `../.env.${stage}`),
});
// resource root domains
const rootDomain = safeEnv('ROOT_DOMAIN');
const checkoutDomain = safeEnv('CHECKOUT_DOMAIN');
const emailDomain = safeEnv('MAIL_DOMAIN');
// common api authorization
const apiKey = safeEnv('API_KEY');
// mailgun specific vars
const mailgunApiKey = safeEnv('MAILGUN_API_KEY');
const emailRecipient = safeEnv('EMAIL_RECIPIENT');
// braintree authorization vars
const braintreeMerchantId = safeEnv('BRAINTREE_MERCHANT_ID');
const braintreePublicKey = safeEnv('BRAINTREE_PUBLIC_KEY');
const braintreePrivateKey = safeEnv('BRAINTREE_PRIVATE_KEY');

const env = {
  NODE_ENV: nodeEnv(),
  STAGE: stage,
  ROOT_DOMAIN: normalizeDomain(rootDomain()),
  CHECKOUT_DOMAIN: normalizeDomain(checkoutDomain()),
  MAIL_DOMAIN: normalizeDomain(emailDomain()),
  EMAIL_RECIPIENT: emailRecipient(),
  API_KEY: apiKey(),
  MAILGUN_API_KEY: mailgunApiKey(),
  BRAINTREE_MERCHANT_ID: braintreeMerchantId(),
  BRAINTREE_PUBLIC_KEY: braintreePublicKey(),
  BRAINTREE_PRIVATE_KEY: braintreePrivateKey(),
};

export default env;
