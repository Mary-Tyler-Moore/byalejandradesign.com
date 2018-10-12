import * as React from 'react';
import { compose } from 'smalldash';
import { paypalCheckout } from 'braintree-web';
import { navigate } from 'gatsby';
// HOC to preload checkout module
import withPaypalButton from './with-paypal-button';
// auto connect HOC
import { withPaymentActions } from '../redux/containers';
import paypalAddress from '../redux/transformers/paypal-address';
// styles
import './paypal.sass';

type State = {
  instance: {
    tokenize: () => null,
  } | null,
};

/**
 * Paypal button. Uses react driver and Braintree client
 * Documentation and helpful articles for Braintree/React integration
 * https://developers.braintreepayments.com/guides/paypal/overview/javascript/v3
 * https://github.com/paypal/paypal-checkout/blob/master/docs/frameworks.md
 */
class Paypal extends React.PureComponent<{}, State> {
  state = {
    instance: null,
  };

  componentDidMount() {
    paypalCheckout
      .create({
        client: this.props.braintree.client,
      })
      .then((instance) => {
        this.setState({ instance });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    if (this.state.instance) {
      this.state.instance.teardown();
    }
  }

  goToNextStep = () => {
    navigate('/checkout/submit');
  };

  /**
   * Paypal button function
   */
  payment = () =>
    this.state.instance.createPayment({
      flow: 'checkout',
      currency: 'USD', // default to paying in USD for now
      amount: 10.0, // TODO: Make amount from redux cart.
      enableShippingAddress: true,
      shippingAddressEditable: false,
      shippingAddressOverride: paypalAddress(this.props.shippingAddress),
    });

  onAuthorize = (data) => {
    Promise.resolve(this.state.instance.tokenizePayment(data))
      .then((payload) => {
        this.props.submitNonce(payload);
        this.goToNextStep();
      })
      .catch((err) => {
        // this.props.paymentError({
        //   type: 'PAYPAL_TOKENIZATION_ERROR',
        //   message: 'Paypal error tokenizing',
        // });
        console.log(err);
      });
  };

  onCancel = (data) => {
    // this.props.paymentError({
    //   type: 'PAYPAL_CANCELLED',
    //   message: 'Paypal transaction was cancelled',
    //   err: data,
    // });

    console.log(data);
  };

  onError = (err) => {
    // this.props.paymentError({
    //   type: 'PAYPAL_CHECKOUT_JS_ERROR',
    //   message: 'Paypal checkout.js error',
    //   err,
    // });

    console.log(err);
  };

  render() {
    // need to uppercase the passed component from driver loader
    const { PaypalButton } = this.props;

    return (
      <section className="paypal">
        {this.props.payment.method === 'paypal' && PaypalButton ? (
          <PaypalButton
            env="sandbox"
            commit={true}
            payment={this.payment}
            onAuthorize={this.onAuthorize}
            onCancel={this.onCancel}
            onError={this.onError}
            style={{
              color: 'blue',
              size: 'responsive',
              label: 'checkout',
              tagline: false,
              shape: 'rect',
            }}
          />
        ) : null}
      </section>
    );
  }
}

export default compose(
  withPaymentActions,
  withPaypalButton
)(Paypal);
