import fallback from './fallback';
import braintree from './braintree/routes';
import address from './address/routes';

const routes = [address, braintree, fallback];
export default routes;
