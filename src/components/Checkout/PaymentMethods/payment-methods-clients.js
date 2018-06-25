import { venmo, paypalCheckout, hostedFields } from 'braintree-web';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export const venmoClient = ({ client, allowNewBrowserTab = true } = {}) =>
    Observable.from(venmo.create({ client, allowNewBrowserTab }));

export const paypalClient = ({ client } = {}) => Observable.from(paypalCheckout.create({ client }));

export const hostedFieldsClient = (options) => Observable.from(hostedFields.create(options));
