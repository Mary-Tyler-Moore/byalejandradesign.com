// @flow
export const submitContactForm = () => ({ type: 'SUBMIT_CONTACT_FORM' });

/**
 * Creates an action with key and value for updating contact form
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export const updateContactForm = (key: string, value: string) => ({
  type: 'UPDATE_CONTACT_FORM',
  value,
  key,
});

export const submitFormSucess = (value: string) => ({
  type: 'SUBMIT_CONTACT_FORM_SUCCESS',
  value,
});

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
