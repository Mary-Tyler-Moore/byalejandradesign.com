import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// actions
import { choosePaymentMethod } from './payment-methods-actions';
// components
import AsyncLoader from '../../Root/AsyncLoader';
import BrainTreeClient from './Braintree';
import { CreditCardOption, PaypalOption, VenmoOption } from './Options';
// style
import './payment-methods.sass';
// async components
const CreditCard = AsyncLoader(() => import('./CreditCard'));
const Paypal = AsyncLoader(() => import('./Paypal'));
const Venmo = AsyncLoader(() => import('./Venmo'));

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
            <VenmoOption
              onClick={this.props.choosePaymentMethod.bind(this, 'venmo')}
            />
            <CreditCardOption
              onClick={this.props.choosePaymentMethod.bind(
                this,
                'hostedFields'
              )}
            />
            <PaypalOption
              onClick={this.props.choosePaymentMethod.bind(this, 'paypal')}
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
  choosePaymentMethod: (method) => dispatch(choosePaymentMethod(method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethods);
