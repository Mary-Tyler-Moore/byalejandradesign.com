// @flow
import type { Action } from './braintree-actions';

type State = {
  +client: {} | null,
  +status: string,
  +token: string,
  +loadedAt: number,
  +error: Error | null,
  +deviceData: {} | null,
  +dataCollectorInstance: {} | null,
};

const brainTree: State = {
  client: null,
  status: 'blank',
  token: '',
  loadedAt: 0,
  error: null,
  deviceData: null,
  dataCollectorInstance: null,
};

const brainTreeReducer = (state: State = brainTree, action: Action) => {
  switch (action.type) {
    // Token Request Actions
    case 'BRAINTREE_TOKEN_REQUEST':
      return {
        ...state,
        status: 'loading',
      };
    case 'BRAINTREE_TOKEN_CANCEL_REQUEST':
      return {
        ...state,
        status: 'blank',
      };
    case 'BRAINTREE_TOKEN_REQUEST_ERROR':
    case 'BRAINTREE_TOKEN_REQUEST_SERVER_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.err,
      };
    // Client Creation Actions
    case 'BRAINTREE_CLIENT_CREATE':
      return {
        ...state,
        token: action.payload,
      };
    case 'BRAINTREE_CLIENT_RESOLVE':
      return {
        ...state,
        client: action.payload,
        status: 'resolved',
        loadedAt: Date.now(),
      };
    case 'BRAINTREE_CLIENT_CREATE_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.err,
      };
    // Data Collector Actions
    case 'BRAINTREE_DATA_COLLECTOR_SAVE_INSTANCE':
      return {
        ...state,
        dataCollectorInstance: action.payload,
      };
    case 'BRAINTREE_DATA_COLLECTOR_SAVE':
      return {
        ...state,
        deviceData: action.payload,
      };
    case 'BRAINTREE_DATA_COLLECTOR_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.err,
      };
    // Default pass-through error
    case 'BRAINTREE_ERROR':
      return {
        ...state,
        status: 'error',
        error: action.err,
      };
    // no reduction actions (redux-observable only)
    case 'BRAINTREE_DATA_COLLECTOR':
    default:
      return state;
  }
};

export default brainTreeReducer;
