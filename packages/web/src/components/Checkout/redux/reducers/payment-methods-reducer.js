/** @flow */
import type {
  CreditCardNonce,
  PaypalNonce,
} from '@byalejandradesign/checkout-objects';
import type { Actions } from '../actions/payment-methods-actions';

export type PaymentMethods = 'paypal' | 'venmo' | 'hostedFields' | '';

export type State = {
  +method: PaymentMethods,
  +instance: {} | null,
  +billingAddress: boolean,
  +email: string,
  +status: string,
  +nonce: null | PaypalNonce | CreditCardNonce,
  +error: string,
};

const payment = {
  method: '',
  instance: null,
  billingAddress: false,
  email: '',
  status: 'ready',
  // verified: '',
  nonce: null,
  error: '',
};

const paymentReducer = (state: State = payment, action: Actions) => {
  switch (action.type) {
    case '@FLOW/EMAIL':
      return {
        ...state,
        email: action.value,
      };

    case '@FLOW/BILLING_ADDRESS':
      return {
        ...state,
        billingAddress: action.value,
      };
    case '@FLOW/CHOOSE':
      return {
        ...state,
        method: action.method,
      };
    case '@FLOW/SAVE_NONCE':
      return {
        ...state,
        nonce: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
