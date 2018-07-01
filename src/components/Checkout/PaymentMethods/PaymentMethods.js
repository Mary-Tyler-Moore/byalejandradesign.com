import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// actions
import { paymentMethodType } from './payment-methods-actions';
// components
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import Venmo from './Venmo';
import BrainTreeClient from '../Braintree';
import { CreditCardOption, PaypalOption, VenmoOption } from './Options';
// style
import './payment-methods.sass';

// const

class PaymentMethods extends PureComponent {
  renderPaymentMethod = () => {
    switch (this.props.method) {
      case 'venmo':
        return <Venmo />;
      case 'paypal':
        return <Paypal />;
      case 'hostedFields':
        return <CreditCard />;
      case '':
      default:
        return null;
    }
  };

  render() {
    return (
      // Preloads BrainTreeClient before loading PaymentMethods
      <BrainTreeClient>
        <section>
          <h3>Choose Your Payment Method</h3>
          <section className="paymentOptions">
            <VenmoOption onClick={this.props.chooseVenmo} />
            <CreditCardOption onClick={this.props.chooseCredit} />
            <PaypalOption onClick={this.props.choosePaypal} />
          </section>
          <section className="paymentMethod">
            {this.renderPaymentMethod()}
          </section>
        </section>
      </BrainTreeClient>
    );
  }
}

const mapStateToProps = (state) => ({
  method: state.checkout.payment.method,
});

const mapDispatchToProps = (dispatch) => ({
  chooseVenmo: () => dispatch(paymentMethodType('venmo')),
  choosePaypal: () => dispatch(paymentMethodType('paypal')),
  chooseCredit: () => dispatch(paymentMethodType('hostedFields')),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethods);
