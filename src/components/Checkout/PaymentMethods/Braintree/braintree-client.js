// @flow
import client from 'braintree-web/client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

export default (authorization: string) =>
  Observable.from(client.create({ authorization }));
