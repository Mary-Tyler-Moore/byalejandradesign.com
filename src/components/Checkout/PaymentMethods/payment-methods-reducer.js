// @flow
import type { Actions } from './payment-methods-actions';

export type methods = 'paypal' | 'venmo' | 'hostedFields' | '';

export type State = {
  +method: methods,
  +instance: {} | null,
  +status: string,
  +nonce: {} | null,
  +error: string,
};

const payment = {
  method: '',
  instance: null,
  status: 'ready',
  // verified: '',
  nonce: null,
  error: '',
};

const paymentReducer = (state: State = payment, action: Actions) => {
  switch (action.type) {
    case '@PAYMENT_METHOD/CHOOSE':
      return {
        ...state,
        method: action.method,
      };
    case '@PAYMENT_METHOD/SAVE_NONCE':
      return {
        ...state,
        nonce: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
