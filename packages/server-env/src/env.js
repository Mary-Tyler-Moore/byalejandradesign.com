/** @flow */
import validateEnv from './validate-env';
import safeStage from './safe-stage';
import normalizeDomain from './normalize-domain';
// get node env
const nodeEnv = validateEnv('NODE_ENV');
// get stage
const stage = safeStage();
// resource root domains
const rootDomain = validateEnv('ROOT_DOMAIN');
const checkoutDomain = validateEnv('CHECKOUT_DOMAIN');
const emailDomain = validateEnv('MAIL_DOMAIN');
// common api authorization
const apiKey = validateEnv('API_KEY');
// mailgun specific vars
const mailgunApiKey = validateEnv('MAILGUN_API_KEY');
const emailRecipient = validateEnv('EMAIL_RECIPIENT');
// braintree authorization vars
const braintreeMerchantId = validateEnv('BRAINTREE_MERCHANT_ID');
const braintreePublicKey = validateEnv('BRAINTREE_PUBLIC_KEY');
const braintreePrivateKey = validateEnv('BRAINTREE_PRIVATE_KEY');

const env = {
  NODE_ENV: nodeEnv,
  STAGE: stage,
  ROOT_DOMAIN: normalizeDomain(rootDomain),
  CHECKOUT_DOMAIN: normalizeDomain(checkoutDomain),
  MAIL_DOMAIN: normalizeDomain(emailDomain),
  EMAIL_RECIPIENT: emailRecipient,
  API_KEY: apiKey,
  MAILGUN_API_KEY: mailgunApiKey,
  BRAINTREE_MERCHANT_ID: braintreeMerchantId,
  BRAINTREE_PUBLIC_KEY: braintreePublicKey,
  BRAINTREE_PRIVATE_KEY: braintreePrivateKey,
};

export default env;
