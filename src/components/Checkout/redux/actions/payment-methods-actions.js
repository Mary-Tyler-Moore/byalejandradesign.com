import { compose } from 'smalldash';
import type { methods } from './payment-methods-reducer';

export const updateEmail = (value) => ({
  type: '@PAYMENT_METHOD/EMAIL',
  value,
});

export const billingAddress = (value) => ({
  type: '@PAYMENT_METHOD/BILLING_ADDRESS',
  value,
});

export const paymentMethodType = (method: methods) => ({
  type: '@PAYMENT_METHOD/CHOOSE',
  method,
});

export const submitNonce = (payload: {}) => ({
  type: '@PAYMENT_METHOD/SAVE_NONCE',
  payload,
});

/* Error Handling */

const defaultError = {
  type: '@PAYMENT_METHOD/ERROR',
  error: new Error('Payment method error'),
};

const paymentMethodErrorAction = (error) => {
  return {
    ...defaultError,
    ...error,
  };
};

const logAction = (action: Actions) => {
  if (process.env.NODE_ENV !== 'production') console.error(action);
  return action;
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
