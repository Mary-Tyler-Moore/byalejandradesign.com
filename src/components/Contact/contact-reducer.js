// @flow
import type { Actions } from './contact-actions';

export type State = {
  +name: string,
  +subject: string,
  +email: string,
  +message: string,
  +status: 'initial' | 'error' | 'loading' | 'resolved',
};

export const contactFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  status: 'initial',
};

const contactReducer = (state: State = contactFields, action: Actions) => {
  switch (action.type) {
    case 'SUBMIT_CONTACT_FORM':
      return { ...state };
    case 'UPDATE_CONTACT_FORM':
      return { ...state, [action.key]: action.value };
    case 'SUBMIT_CONTACT_FORM_SUCCESS':
      return { ...state, contactFields, status: action.value };
    case 'SUBMIT_CONTACT_FORM_ERROR':
      return { ...state, status: action.value };
    default:
      return { ...state };
  }
};

export default contactReducer;
