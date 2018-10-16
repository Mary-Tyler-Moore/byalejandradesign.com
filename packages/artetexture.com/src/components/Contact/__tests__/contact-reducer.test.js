import { updateContactForm } from '../contact-actions';
import contactReducer, { contactFields } from '../contact-reducer';

describe('reducer style logic for react contact component', () => {
  test('it updates the value', () => {
    const nextState = contactReducer(
      contactFields,
      updateContactForm('name', 'nick')
    );

    expect(nextState).toMatchObject({ ...contactFields, name: 'nick' });
  });
});
