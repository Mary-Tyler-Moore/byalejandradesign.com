// @flow
/**
 * Saves an authorized braintree client to redux state
 * @param {object} payload an authorized created braintree client
 */
export const saveClient = (payload: {}) => ({
  type: '@BRAINTREE/SAVE_CLIENT',
  payload,
});

/**
 * Saves a data collector instance to redux state
 * @param {object} payload dataCollector from braintree
 * https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3
 */
export const saveCollector = (payload: {}) => ({
  type: '@BRAINTREE/SAVE_DATA_COLLECTOR',
  payload,
});

export const deviceData = (payload: {}) => ({
  type: '@BRAINTREE/DEVICE_DATA',
  payload,
});

const logErrors = (err) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);
};

/**
 * Log errors to redux
 * @param  {[type]} message [description]
 * @param  {[type]} err     [description]
 * @param  {[type]} status  [description]
 * @return {[type]}         [description]
 */
export const braintreeError = (error: Error) => {
  logErrors(error);
  return { type: '@BRAINTREE/ERROR', error };
};

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof braintreeError>
  | $Call<ExtractReturn, typeof saveClient>
  | $Call<ExtractReturn, typeof saveCollector>
  | $Call<ExtractReturn, typeof deviceData>;
