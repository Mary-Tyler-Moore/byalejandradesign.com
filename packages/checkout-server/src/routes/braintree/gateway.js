import braintree from 'braintree';

const stage = process.env.STAGE;

const gateway = braintree.connect({
  environment:
    stage !== 'production '
      ? braintree.Environment.Sandbox
      : braintree.Environment.Production,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export default gateway;
