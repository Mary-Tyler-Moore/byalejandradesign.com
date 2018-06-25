import { compose } from 'smalldash';

export const choosePaymentMethod = (method) => ({
  type: 'PAYMENT_METHOD_CHOOSE',
  method,
});

export const createPaymentInstance = (method) => (options) => ({
  type: 'PAYMENT_METHOD_INSTANCE_CREATE',
  options,
  method,
});

export const cancelCreatePaymentInstance = (method) => () => ({
  type: 'PAYMENT_METHOD_INSTANCE_CANCEL',
  method,
});

export const savePaymentInstance = (method) => (payload) => ({
  type: 'PAYMENT_METHOD_INSTANCE_SAVE',
  method,
  payload,
});

const createPaymentInstanceErrorAction = (method) => ({
  type = 'PAYMENT_METHOD_INSTANCE_ERROR',
  message = 'Payment method instance creation error',
  err = new Error('Payment method instance creation error'),
} = {}) => ({
  type,
  message,
  err,
  method,
});

const logAction = (action) => {
  if (process.env.NODE_ENV !== 'production') console.error(action);
  return action;
};

export const createPaymentInstanceError = (method) =>
  compose(
    createPaymentInstanceErrorAction(method),
    logAction
  );

export const savePaymentNonce = (method) => (payload) => ({
  type: 'PAYMENT_METHOD_SAVE_NONCE',
  method,
  payload,
});

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;

export type Action =
  | $Call<ExtractReturn, typeof choosePaymentMethod>
  | $Call<ExtractReturn, typeof createPaymentInstance>
  | $Call<ExtractReturn, typeof cancelCreatePaymentInstance>
  | $Call<ExtractReturn, typeof createPaymentInstanceError>
  | $Call<ExtractReturn, typeof savePaymentNonce>;
