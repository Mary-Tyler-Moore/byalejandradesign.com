// @flow
import type { Actions } from './payment-methods-actions';

export type State = {
  +method: string,
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
    case 'PAYMENT_METHOD_TEARDOWN_ERROR':
      return {
        ...state,
        status: 'error',
      };
    case 'PAYMENT_METHOD_TEARDOWN_COMPLETE':
    case 'PAYMENT_METHOD_NO_TEARDOWN':
      return {
        ...state,
        method: action.nextMethod,
        status: 'ready',
      };
    case 'PAYMENT_METHOD_INSTANCE_CREATE':
      return {
        ...state,
        status: 'creating',
      };
    case 'PAYMENT_METHOD_INSTANCE_SAVE':
      return {
        ...state,
        instance: action.payload,
        status: 'resolved',
      };
    case 'PAYMENT_METHOD_INSTANCE_ERROR':
      return {
        ...state,
        error: action.err,
        status: 'error',
      };
    default:
      return state;
  }
};

export default paymentReducer;
