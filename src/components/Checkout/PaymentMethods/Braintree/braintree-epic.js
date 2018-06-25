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
import server from './braintree-server';
import client from './braintree-client';
import dataCollector from './data-collector-client';
// combiner
import { combineEpics } from 'redux-observable';
// actions
import {
  brainTreeCreateClient,
  brainTreeError,
  brainTreeSaveClient,
  dataCollectorSaveInstance,
} from './braintree-actions';

/**
 * Helper function to access the braintree client from redux-observable 'light store'
 * @param {object} store redux 'light store' passed from redux-observable
 * @return {object} returns an authorized braintree client
 */
export const getClient = (store) => store.getState().checkout.braintree.client;

/**
 * This is the epic for requesting a client token from our server
 * @param {stream$} actions$ observable stream of redux actions
 */
const tokenRequestEpic = (actions$) =>
  actions$
    .ofType('BRAINTREE_TOKEN_REQUEST')
    .mergeMap(() =>
      server('/client_token')
        .mergeMap((json) => {
          console.log(json);
          return Observable.of(brainTreeCreateClient(json.clientToken));
        })
        .takeUntil(actions$.ofType('BRAINTREE_TOKEN_CANCEL_REQUEST'))
    )
    .catch(({ response } = {}) =>
      Observable.of(
        brainTreeError({
          type: 'BRAINTREE_TOKEN_REQUEST_ERROR',
          message: response.message,
          status: response.status,
        })
      )
    );

/**
 * This epic is for creating the braintree client
 * @param {stream$} actions$ observable stream of redux actions
 */
const clientCreationEpic = (actions$) =>
  actions$
    .ofType('BRAINTREE_CLIENT_CREATE')
    .mergeMap(({ payload }) =>
      client(payload).mergeMap((response) =>
        Observable.of(brainTreeSaveClient(response))
      )
    )
    .catch((err) =>
      brainTreeError({
        type: 'BRAINTREE_CLIENT_CREATE_ERROR',
        message: 'Error creating braintree client',
        err,
      })
    );

/**
 * This epic is for creating the data collection instance
 * @param {stream$} actions$ observable stream of redux actions
 */
const dataCollectorEpic = (actions$, store) =>
  actions$
    .ofType('BRAINTREE_DATA_COLLECTOR_CREATE')
    .mergeMap(() =>
      dataCollector({
        client: getClient(store),
        paypal: true,
      }).mergeMap((dataCollectorInstance) =>
        Observable.of(dataCollectorSaveInstance(dataCollectorInstance))
      )
    )
    .catch((err) =>
      Observable.of(
        brainTreeError({
          type: err.code,
          message: err.message,
          err,
        })
      )
    );

export default combineEpics(
  tokenRequestEpic,
  clientCreationEpic,
  dataCollectorEpic
);
