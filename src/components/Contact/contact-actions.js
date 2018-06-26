// @flow

/**
 * Creates an action for submitting the form
 * @return {[type]} [description]
 */
export const submitContactForm = () => ({ type: 'SUBMIT_CONTACT_FORM' });

/**
 * Creates an action with key and value for updating contact form
 * @param  {string} key   [description]
 * @param  {string} value [description]
 * @return {action}       [description]
 */
export const updateContactForm = (key: string, value: string) => ({
  type: 'UPDATE_CONTACT_FORM',
  value,
  key,
});

/**
 * Creates
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const submitFormSucess = (value: string) => ({
  type: 'SUBMIT_CONTACT_FORM_SUCCESS',
  value,
});

/**
 * Creates a contact form error
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const submitFormError = (value: string) => ({
  type: 'SUBMIT_CONTACT_FORM_ERROR',
  value,
});

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof submitContactForm>
  | $Call<ExtractReturn, typeof updateContactForm>
  | $Call<ExtractReturn, typeof submitFormError>
  | $Call<ExtractReturn, typeof submitFormSucess>;
