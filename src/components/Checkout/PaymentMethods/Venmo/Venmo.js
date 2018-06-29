// @flow
import * as React from 'react';
import withPaymentActions from '../with-payment-actions';
import { DataCollectorProvider } from '../../Braintree';
// assets
import './venmo.sass';
import logo from './white_logo.svg';

/**
 * Documentation here
 * https://developers.braintreepayments.com/guides/venmo/client-side/javascript/v3
 */
class Venmo extends React.PureComponent {
  componentDidMount() {
    this.props.createInstance();
  }

  onVenmoClick = (event) => {
    event.preventDefault();
    if (this.props.payment.instance && this.props.payment.method === 'venmo') {
      Promise.resolve(this.props.payment.instance.tokenize())
        .then((payload) => this.props.submitNonce(payload))
        .catch((err) => {
          this.props.paymentError({
            type: err.code,
            message: err.message,
            err,
          });
        });
    }
  };

  render() {
    return (
      <DataCollectorProvider>
        <div className="venmoOption_container">
          <button className="venmoButton" onClick={this.onVenmoClick}>
            <img className="venmoButton_img" src={logo} alt="venmo_logo" />
          </button>
        </div>
      </DataCollectorProvider>
    );
  }
}

export default withPaymentActions('venmo')(Venmo);
