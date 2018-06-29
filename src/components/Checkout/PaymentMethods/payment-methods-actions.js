// @flow
import { compose } from 'smalldash';

export type methods = 'paypal' | 'venmo' | 'hostedFields';

export const choosePaymentMethod = (method: methods) => ({
  type: 'PAYMENT_METHOD_CHOOSE',
  method,
});

export const createPaymentInstance = (method: methods) => (options: {}) => ({
  type: 'PAYMENT_METHOD_INSTANCE_CREATE',
  options,
  method,
});

export const cancelCreatePaymentInstance = (method: methods) => () => ({
  type: 'PAYMENT_METHOD_INSTANCE_CANCEL',
  method,
});

export const savePaymentInstance = (method: methods) => (payload: {}) => ({
  type: 'PAYMENT_METHOD_INSTANCE_SAVE',
  method,
  payload,
});

const createPaymentInstanceErrorAction = (method: methods) => ({
  type = 'PAYMENT_METHOD_INSTANCE_ERROR',
  message = 'Payment method instance creation error',
  err = new Error('Payment method instance creation error'),
} = {}) => ({
  type,
  message,
  err,
  method,
});

const logAction = (action: Actions) => {
  if (process.env.NODE_ENV !== 'production') console.error(action);
  return action;
};

export const createPaymentInstanceError = (method: methods) =>
  compose(
    createPaymentInstanceErrorAction(method),
    logAction
  );

export const savePaymentNonce = (method: methods) => (payload: {}) => ({
  type: 'PAYMENT_METHOD_SAVE_NONCE',
  method,
  payload,
});

type Fn<T> = (...args: Array<any>) => T;
type ExtractReturn = <T>(Fn<T>) => T;
type CurriedExtract = <T>($Call<Fn<T>>) => T;

export type Actions =
  | $Call<ExtractReturn, typeof choosePaymentMethod>
  | $Call<ExtractReturn, $Call<ExtractReturn, typeof createPaymentInstance>>
  | $Call<ExtractReturn, $Call<ExtractReturn, typeof savePaymentNonce>>
  | $Call<ExtractReturn, $Call<ExtractReturn, typeof savePaymentInstance>>
  | $Call<
      ExtractReturn,
      $Call<ExtractReturn, typeof cancelCreatePaymentInstance>
    >
  | $Call<
      ExtractReturn,
      $Call<ExtractReturn, typeof createPaymentInstanceErrorAction>
    >;
