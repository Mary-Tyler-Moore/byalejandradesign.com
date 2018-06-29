// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch, Store } from '../../../store/types';

import {
  createPaymentInstance,
  cancelCreatePaymentInstance,
  createPaymentInstanceError,
  savePaymentNonce,
} from './payment-methods-actions';

// import type { State } from '../checkout-reducer';
import type { methods } from './payment-methods-actions';

/**
 * Connect state to Payment Components
 * Automatically stub the payment method redux actions
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
const withPaymentActions = (type: methods) => (
  Wrapped: React.ComponentType<any>
) => {
  const mapStateToProps = (state: Store) => ({
    braintree: state.checkout.braintree,
    shippingAddress: state.checkout.shippingAddress,
    payment: state.checkout.payment,
  });

  const mapDispatchToProps = (dispatch: Dispatch) => ({
    submitNonce: (payload) => dispatch(savePaymentNonce(type)(payload)),
    paymentError: (err) => dispatch(createPaymentInstanceError(type)(err)),
    createInstance: (options = {}) =>
      dispatch(createPaymentInstance(type)(options)),
    cancelInstance: () => dispatch(cancelCreatePaymentInstance(type)()),
  });

  const connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);

  return connectedComponent;
};

export default withPaymentActions;
