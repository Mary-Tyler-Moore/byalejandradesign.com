/** @flow */
import { address } from '@byalejandradesign/checkout-objects';
// types
import type { Actions } from '../actions/address-actions';
import type { Address } from '@byalejandradesign/checkout-objects';

const addressReducer = (slice: string) => (
  state: Address = address,
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
