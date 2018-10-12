import * as React from 'react';
import { navigate } from 'gatsby';
import { venmo } from 'braintree-web';
import { withPaymentActions } from '../redux/containers';
// assets
import './venmo.sass';
import logo from './white_logo.svg';

type State = {
  instance: {
    tokenize: () => Promise<any>,
    teardown: () => Promise<any>,
  } | null,
};

/**
 * Documentation here
 * https://developers.braintreepayments.com/guides/venmo/client-side/javascript/v3
 */
class Venmo extends React.PureComponent<{}, State> {
  state = {
    instance: null,
  };

  componentDidMount() {
    venmo
      .create({
        client: this.props.braintree.client,
        allowNewBrowserTab: false,
      })
      .then((instance) => {
        this.setState({
          instance,
        });
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

  onVenmoClick = (event) => {
    event.preventDefault();
    if (this.state.instance && this.props.payment.method === 'venmo') {
      Promise.resolve(this.state.instance.tokenize())
        .then((payload) => {
          this.props.submitNonce(payload);
          this.goToNextStep();
        })
        .catch((error) => {
          // this.props.paymentError({
          //   type: error.code,
          //   message: error.message,
          //   error,
          // });
          console.log(error);
        });
    }
  };

  render() {
    return (
      <section className="venmoOption">
        <button className="venmoButton" onClick={this.onVenmoClick}>
          <img className="venmoButton_img" src={logo} alt="venmo_logo" />
        </button>
      </section>
    );
  }
}

export default withPaymentActions(Venmo);
