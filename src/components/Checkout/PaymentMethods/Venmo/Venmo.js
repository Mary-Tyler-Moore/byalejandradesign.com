import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// actions
import {
  createPaymentInstance,
  cancelCreatePaymentInstance,
  createPaymentInstanceError,
  savePaymentNonce,
} from '../payment-methods-actions';
import { DataCollector } from '../Braintree';

import './venmo.sass';
import logo from './white_logo.svg';

/**
 * Documentation here
 * https://developers.braintreepayments.com/guides/venmo/client-side/javascript/v3
 */
class Venmo extends PureComponent {
  componentWillMount() {
    this.props.venmoInstance();
  }

  onVenmoClick = async (event) => {
    event.preventDefault();
    if (this.props.payment.instance && this.props.payment.method === 'venmo') {
      try {
        const payload = await this.props.payment.instance.tokenize();
        this.props.venmoNonce(payload);
      } catch (err) {
        // deconstruct native venmo errors to this app's actions
        this.props.venmoError({
          type: err.code,
          message: err.message,
          err,
        });
      }
    }
  };

  render() {
    return (
      <DataCollector>
        <div className="venmoOption_container">
          <button className="venmoButton" onClick={this.onVenmoClick}>
            <img className="venmoButton_img" src={logo} alt="venmo_logo" />
          </button>
        </div>
      </DataCollector>
    );
  }
}

const mapStateToProps = (state) => ({
  braintree: state.checkout.braintree,
  payment: state.checkout.payment,
});

const mapDispatchToProps = (dispatch) => ({
  // pass venmo errors through
  venmoError: (err) => dispatch(createPaymentInstanceError('venmo')(err)),
  // pass whole nonce
  venmoNonce: (payload) => dispatch(savePaymentNonce('venmo')(payload)),
  // create venmo client
  venmoInstance: () => dispatch(createPaymentInstance('venmo')()),
  // cancel client creation
  venmoInstanceCancel: () => dispatch(cancelCreatePaymentInstance('venmo')()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Venmo);
