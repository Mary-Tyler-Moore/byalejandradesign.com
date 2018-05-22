import fallback from './fallback';
import braintree from './braintree/routes';
import test from './test';

const routes = [braintree, test, fallback];
export default routes;
