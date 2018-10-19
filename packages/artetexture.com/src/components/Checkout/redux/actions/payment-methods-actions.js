/** @flow */
import { compose } from 'smalldash';
import type { PaymentMethods } from '../reducers/payment-methods-reducer';
import type { Nonce } from '@artetexture/checkout-objects';

// (compose: $Compose);

export const updateEmail = (value: string) => ({
  type: '@FLOW/EMAIL',
  value,
});

export const billingAddress = (value: string) => ({
  type: '@FLOW/BILLING_ADDRESS',
  value,
});

export const paymentMethodType = (method: PaymentMethods) => ({
  type: '@FLOW/CHOOSE',
  method,
});

export const submitNonce = (payload: Nonce) => ({
  type: '@FLOW/SAVE_NONCE',
  payload,
});

/* Error Handling */

const defaultError = {
  type: '@FLOW/ERROR',
  error: new Error('Payment method error'),
};

const paymentMethodErrorAction = (error: Error) => {
  return {
    ...defaultError,
    ...error,
  };
};

export const paymentMethodError = compose(
  paymentMethodErrorAction,
  logAction
);

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof paymentMethodType>
  | $Call<ExtractReturn, typeof submitNonce>
  | $Call<ExtractReturn, typeof paymentMethodErrorAction>;

function logAction(action) {
  if (process.env.NODE_ENV !== 'production') console.error(action);
  return action;
}
