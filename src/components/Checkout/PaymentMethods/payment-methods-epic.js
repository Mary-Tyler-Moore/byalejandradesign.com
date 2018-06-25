// rxjs operators
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/takeUntil';
import { combineEpics } from 'redux-observable';
// observables from promises
import {
  venmoClient,
  paypalClient,
  hostedFieldsClient,
} from './payment-methods-clients';
// actions
import {
  createPaymentInstanceError,
  savePaymentInstance,
} from './payment-methods-actions';
// getters
import { getClient } from './Braintree/braintree-epic';

/**
 * Merges braintree client with options to create a payment method instance.
 * @param {object} action this is a redux action
 * @param {*} store light store from redux-observable
 */
const returnClient = (action, store) => {
  // first get the client from the 'light store' available in redux-observable
  const client = getClient(store);
  // merge client from store
  const args = { ...action.options, client };
  // return observable based on the which instance creation method we are using
  switch (action.method) {
    case 'venmo':
      return venmoClient(args);
    case 'paypal':
      return paypalClient(args);
    case 'hostedFields':
      return hostedFieldsClient(args);
    default:
      return null;
  }
};

const paymentMethodsEpic = (actions$, store) =>
  actions$
    .ofType('PAYMENT_METHOD_INSTANCE_CREATE')
    .mergeMap((action) =>
      returnClient(action, store)
        .mergeMap((paymentInstance) =>
          Observable.of(savePaymentInstance(action.method)(paymentInstance))
        )
        // if cancellation fires before complete then we stop the promise
        .takeUntil(actions$.ofType('PAYMENT_METHOD_INSTANCE_CANCEL'))
    )
    .catch((err) =>
      Observable.of(
        createPaymentInstanceError({
          type: err.code,
          message: err.message,
          err,
        })
      )
    );

const getInstance = (store) => store.getState().checkout.payment.instance;
const getMethod = (store) => store.getState().checkout.payment.method;

const paymentMethodsTeardown = (actions$, store) =>
  actions$.ofType('PAYMENT_METHOD_CHOOSE').mergeMap((action) => {
    const instance = getInstance(store);
    const method = getMethod(store);
    return !instance || method === action.method
      ? Observable.of({
          type: 'PAYMENT_METHOD_NO_TEARDOWN',
          nextMethod: action.method,
        })
      : Observable.from(instance.teardown()).mergeMap(
          (teardown) =>
            !teardown
              ? Observable.of({
                  type: 'PAYMENT_METHOD_TEARDOWN_COMPLETE',
                  nextMethod: action.method,
                })
              : Observable.of({
                  type: 'PAYMENT_METHOD_TEARDOWN_ERROR',
                  teardown,
                })
        );
  });

export default combineEpics(paymentMethodsEpic, paymentMethodsTeardown);
