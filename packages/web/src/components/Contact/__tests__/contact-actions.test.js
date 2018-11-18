import {
  updateContactForm,
  submitFormError,
  submitFormSuccess,
  submitContactForm,
} from '../contact-actions';

describe('testing action creators for contact form', () => {
  test('creates an update action', () => {
    const expected = {
      type: 'UPDATE_CONTACT_FORM',
      key: 'name',
      value: 'nick',
    };

    expect(updateContactForm('name', 'nick')).toMatchObject(expected);
  });

  test('creates a submit action', () => {
    const expected = { type: 'SUBMIT_CONTACT_FORM' };

    expect(submitContactForm()).toMatchObject(expected);
  });

  test('creates a success action', () => {
    const expected = { type: 'SUBMIT_CONTACT_FORM_SUCCESS', value: 'message' };

    expect(typeof submitFormSuccess).toBe('function');
    expect(submitFormSuccess('message')).toMatchObject(expected);
  });

  test('creates a success action', () => {
    const expected = { type: 'SUBMIT_CONTACT_FORM_ERROR', value: 'error' };

    expect(submitFormError('error')).toMatchObject(expected);
  });
});
