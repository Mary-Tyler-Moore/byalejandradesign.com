import * as React from 'react';
import { connect } from 'react-redux';
// import type { Dispatch, Store } from '../../../store/types';

import {
  paymentMethodError,
  submitNonce,
} from '../actions/payment-methods-actions';

/**
 * Connect state to Payment Components
 * Automatically stub the payment method redux actions
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
const withPaymentActions = (Wrapped: React.ComponentType<any>) => {
  const mapStateToProps = (state) => ({
    braintree: state.checkout.braintree,
    shippingAddress: state.checkout.shippingAddress,
    payment: state.checkout.payment,
  });

  const mapDispatchToProps = (dispatch) => ({
    submitNonce: (payload) => dispatch(submitNonce(payload)),
    paymentError: (err) => dispatch(paymentMethodError(err)),
  });

  const connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Wrapped);

  return connectedComponent;
};

export default withPaymentActions;
