/** @flow */
import type { Actions } from '../actions/address-actions';
import type { Address } from 'checkout';

/** Initial Fake Address for Development */
const fakeAddress = {
  firstName: 'Steve',
  lastName: 'Jobs',
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
  firstName: '',
  lastName: '',
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

const initial =
  process.env.NODE_ENV === 'development' ? fakeAddress : blankAddress;

const addressReducer = (slice: string) => (
  state: Address = initial,
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
