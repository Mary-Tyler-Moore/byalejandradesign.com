// @flow
import { compose } from 'smalldash';

/**
 * Log errors to to console as errors
 * @param {object} action redux style actions
 */
const logAction = (action) => {
  if (process.env.NODE_ENV !== 'production')
    console.error(JSON.stringify(action, null, 4));
  return action;
};

const brainTreeErrorAction = ({
  type = 'BRAINTREE_ERROR',
  message = 'Braintree error',
  err = new Error('braintree error'),
  status = 404,
} = {}) => ({
  type,
  message,
  err,
  status,
});

export const brainTreeError = compose(
  brainTreeErrorAction,
  logAction
);

/**
 * Creates a braintree client from an authorization
 */
export const brainTreeCreateClient = (payload: string) => ({
  type: 'BRAINTREE_CLIENT_CREATE',
  payload,
});

/**
 * Saves an authorized braintree client to redux state
 * @param {object} payload an authorized created braintree client
 */
export const brainTreeSaveClient = (payload: {}) => ({
  type: 'BRAINTREE_CLIENT_RESOLVE',
  payload,
});

/**
 * Initiates a request to the server for a braintree token
 */
export const clientTokenRequest = () => ({
  type: 'BRAINTREE_TOKEN_REQUEST',
});

/**
 * Cancels the axios request to the server
 */
export const clientTokenCancelRequest = () => ({
  type: 'BRAINTREE_TOKEN_CANCEL_REQUEST',
});

/**
 * Initiates the creation of the braintree data collector instance
 */
export const dataCollector = () => ({
  type: 'BRAINTREE_DATA_COLLECTOR_CREATE',
});

/**
 * Saves a data collector instance to redux state
 * @param {object} payload dataCollectorInstance from braintree
 * https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3
 */
export const dataCollectorSaveInstance = (payload: {}) => ({
  type: 'BRAINTREE_DATA_COLLECTOR_SAVE_INSTANCE',
  payload,
});

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof brainTreeError>
  | $Call<ExtractReturn, typeof brainTreeCreateClient>
  | $Call<ExtractReturn, typeof brainTreeSaveClient>
  | $Call<ExtractReturn, typeof clientTokenRequest>
  | $Call<ExtractReturn, typeof clientTokenCancelRequest>
  | $Call<ExtractReturn, typeof dataCollector>
  | $Call<ExtractReturn, typeof dataCollectorSaveInstance>;
