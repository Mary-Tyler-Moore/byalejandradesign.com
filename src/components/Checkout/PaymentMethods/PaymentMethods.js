import * as React from 'react';
import { connect } from 'react-redux';
// actions
import { paymentMethodType } from './payment-methods-actions';
// components
import CreditCard from './CreditCard';
import Paypal from './Paypal';
import Venmo from './Venmo';
import BrainTreeClient from '../Braintree';
import PaymentOption from './PaymentOption';
// style
import './payment-methods.sass';
// assets
import paypalLogo from 'payment-icons/svg/flat/paypal.svg';
import venmoLogo from './blue_venmo_acceptance_mark.svg';
import creditLogo from 'payment-icons/svg/flat/default.svg';

class PaymentMethods extends React.PureComponent {
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
        <section className="paymentMethods">
          <h5 className="h5-amiri">Choose Your Payment Method</h5>
          <section className="paymentOptions">
            <PaymentOption
              label="Venmo"
              image={venmoLogo}
              onClick={this.props.chooseVenmo}
            />
            <PaymentOption
              label="Credit Card"
              image={creditLogo}
              onClick={this.props.chooseCredit}
            />
            <PaymentOption
              label="Paypal"
              image={paypalLogo}
              onClick={this.props.choosePaypal}
            />
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
