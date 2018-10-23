/** @flow */
import checkRequired from './check-required';
import validateServerAddress from './validate-server-address';
import validateCustomer from './validate-customer';
import { nullish } from 'smalldash';
// types
import type { Transaction } from '../objects';
import type { ValidationResponse, Check } from './types';

const validateTransaction = (transaction: Transaction): Transaction => {
  const {
    amount,
    paymentMethodNonce,
    billing,
    shipping,
    customer,
    lineItems,
    orderId,
  } = transaction;

  // const invalidFields = checkRequired(requiredFields, stringish);
  //
  // const invalidFieldObjects = {
  //   shipping: validateServerAddress(shipping),
  //   billing: validateServerAddress(billing),
  //   customer: validateCustomer(customer),
  // };

  return {
    amount,
    paymentMethodNonce,
    billing,
    shipping,
    customer,
    lineItems,
    orderId,
  };
};

export default validateTransaction;
