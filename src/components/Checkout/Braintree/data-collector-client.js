import dataCollector from 'braintree-web/data-collector';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export default ({ client, paypal = true } = {}) =>
    Observable.from(dataCollector.create({ client, paypal }));
