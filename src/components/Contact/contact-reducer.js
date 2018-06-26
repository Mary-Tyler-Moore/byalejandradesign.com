// @flow
import type { Actions } from './contact-actions';

export type State = {
  +name: string,
  +subject: string,
  +email: string,
  +message: string,
  +status: 'initial' | 'error' | 'loading' | 'resolved',
};

const errorMessage =
  'There was a problem sending your message. Please try again';

const successMessage = 'Message sent successfully';

export const contactFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  status: 'initial',
  userMessage: '',
};

const contactReducer = (state: State = contactFields, action: Actions) => {
  switch (action.type) {
    case 'SUBMIT_CONTACT_FORM':
      return { ...state, status: 'loading' };
    case 'UPDATE_CONTACT_FORM':
      return { ...state, [action.key]: action.value };
    case 'SUBMIT_CONTACT_FORM_SUCCESS':
      return {
        ...state,
        contactFields,
        status: 'resolved',
        userMessage: successMessage,
      };
    case 'SUBMIT_CONTACT_FORM_ERROR':
      return { ...state, status: 'error', userMessage: errorMessage };
    default:
      return { ...state };
  }
};

export default contactReducer;
