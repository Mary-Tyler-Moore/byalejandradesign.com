import { compose } from 'smalldash';
import type { methods } from './payment-methods-reducer';

export const updateEmail = (value) => ({
  type: '@FLOW/EMAIL',
  value,
});

export const billingAddress = (value) => ({
  type: '@FLOW/BILLING_ADDRESS',
  value,
});

export const paymentMethodType = (method: methods) => ({
  type: '@FLOW/CHOOSE',
  method,
});

export const submitNonce = (payload: {}) => ({
  type: '@FLOW/SAVE_NONCE',
  payload,
});

/* Error Handling */

const defaultError = {
  type: '@FLOW/ERROR',
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
