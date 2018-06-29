// rxjs operators
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/takeUntil';
// observables from promises
import addressServer from './address-server';
// combiner
import { combineEpics } from 'redux-observable';

const getShippingAddress = (store) => store.value.checkout.shippingAddress;

/**
 *
 * @param {stream$} actions$ observable stream of redux actions
 */
const addressValidationUSPS = (actions$, store) =>
  actions$
    .ofType('VALIDATE_ADDRESS')
    .mergeMap(() =>
      addressServer(getShippingAddress(store))
        .mergeMap((response) =>
          Observable.of({
            type: 'VALIDATE_ADDRESS_SUCCESS',
            payload: response,
          })
        )
        .takeUntil(actions$.ofType('USPS_ADDRESS_VALIDATION_CANCEL'))
    )
    .catch((err) =>
      Observable.of({
        type: 'USPS_ADDRESS_VALIDATION_ERROR',
        message: 'USPS Address validation error',
        err,
      })
    );

export default combineEpics(addressValidationUSPS);
