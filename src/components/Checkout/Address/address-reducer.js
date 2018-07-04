
import type { Actions } from './address-actions';

export type State = {
  +fullName: string,
  +streetAddress1: string,
  +streetAddress2: string,
  +city: string,
  +countryCode: string,
  +postalCode: string,
  +province: string,
  +phone: string,
};

/** Initial Fake Address for Development */
const fakeAddress = {
  fullName: 'Steve Jobs',
  streetAddress1: 'One Infinite Loop',
  streetAddress2: '',
  city: 'Cupertino',
  postalCode: '95014',
  province: 'CA',
  countryCode: 'US',
  phone: '123.456.7890',
};

/** Initial Address State */
const blankAddress = {
  fullName: '',
  streetAddress1: '',
  streetAddress2: '',
  city: '',
  // everything is postalCode for easier use
  province: '',
  // everything is province for easier use
  postalCode: '',
  // must define default country **important**
  countryCode: 'US',
  phone: '',
};

const initialState: State =
  process.env.NODE_ENV === 'development' ? fakeAddress : blankAddress;

const addressReducer = (slice: string) => (
  state: State = initialState,
  action: Actions
) => {
  if (action.slice !== slice) return state;

  switch (action.type) {
    case 'UPDATE_ADDRESS_FIELD':
      return {
        ...state,
        [action.key]: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
