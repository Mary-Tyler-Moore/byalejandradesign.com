/** @flow */
import normalizeDomain from './normalize-domain';

const env = {
  STAGE: 'STAGE',
  ROOT_DOMAIN: normalizeDomain('ROOT_DOMAIN'),
  CHECKOUT_DOMAIN: normalizeDomain('CHECKOUT_DOMAIN'),
  MAIL_DOMAIN: normalizeDomain('MAIL_DOMAIN'),
  EMAIL_RECIPIENT: 'EMAIL_RECIPIENT',
  API_KEY: 'API_KEY',
  MAILGUN_DOMAIN: 'MAILGUN_DOMAIN',
  MAILGUN_API_KEY: 'MAILGUN_API_KEY',
  BRAINTREE_MERCHANT_ID: 'BRAINTREE_MERCHANT_ID',
  BRAINTREE_PUBLIC_KEY: 'BRAINTREE_PUBLIC_KEY',
  BRAINTREE_PRIVATE_KEY: 'BRAINTREE_PRIVATE_KEY',
  INVALIDATE: 'INVALIDATE',
};

export const INVALIDATE = 'INVALIDATE';
export const STAGE = 'STAGE';
export const ROOT_DOMAIN = normalizeDomain('ROOT_DOMAIN');
export const CHECKOUT_DOMAIN = normalizeDomain('CHECKOUT_DOMAIN');
export const MAIL_DOMAIN = normalizeDomain('MAIL_DOMAIN');
export const EMAIL_RECIPIENT = 'EMAIL_RECIPIENT';
export const API_KEY = 'API_KEY';
export const MAILGUN_DOMAIN = 'MAILGUN_DOMAIN';
export const MAILGUN_API_KEY = 'MAILGUN_API_KEY';
export const BRAINTREE_MERCHANT_ID = 'BRAINTREE_MERCHANT_ID';
export const BRAINTREE_PUBLIC_KEY = 'BRAINTREE_PUBLIC_KEY';
export const BRAINTREE_PRIVATE_KEY = 'BRAINTREE_PRIVATE_KEY';

export default env;
