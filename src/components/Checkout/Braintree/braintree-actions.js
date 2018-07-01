// @flow
/**
 * Saves an authorized braintree client to redux state
 * @param {object} payload an authorized created braintree client
 * @return {action}         action object
 */
export const saveClient = (payload: {}) => ({
  type: '@BRAINTREE/SAVE_CLIENT',
  payload,
});

/**
 * Saves a data collector instance to redux state
 * @param {object} payload dataCollector from braintree
 * @return {action}         action object
 * https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3
 */
export const saveCollector = (payload: {}) => ({
  type: '@BRAINTREE/SAVE_DATA_COLLECTOR',
  payload,
});

/**
 * Creates an action to save device data to redux state
 * @param  {object} payload device data from the BT collector
 * @return {action}         action object
 */
export const deviceData = (payload: {}) => ({
  type: '@BRAINTREE/DEVICE_DATA',
  payload,
});

/**
 * Print errors to console directly during development
 * @param  {error} err  error of unknown type
 */
const logErrors = (err) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);
};

/**
 * Logs errors of unknown type to redux state
 * @param  {error} error  error of unknown type
 * @return {action}       action object
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
