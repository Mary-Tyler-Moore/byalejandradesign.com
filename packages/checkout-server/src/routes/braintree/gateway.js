import braintree from 'braintree';
import env from '@artetexture/server-env';

const gateway = braintree.connect({
  environment:
    env.STAGE !== 'production '
      ? braintree.Environment.Sandbox
      : braintree.Environment.Production,
  merchantId: env.BRAINTREE_MERCHANT_ID,
  publicKey: env.BRAINTREE_PUBLIC_KEY,
  privateKey: env.BRAINTREE_PRIVATE_KEY,
});

export default gateway;
