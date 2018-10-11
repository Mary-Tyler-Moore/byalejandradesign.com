import * as React from 'react';
import Button from '../../Button';
import server from '../server';
import { connect } from 'react-redux';

import CartContents from '../../CartContents';
import { createAddressDisplay } from '../create-address';

const ShippingAddress = createAddressDisplay('shippingAddress');
const BillingAddress = createAddressDisplay('billingAddress');

class Confirmation extends React.PureComponent {
  state = {
    total: 0,
  };

  paymentMethodDisplay = () => {
    switch (this.props.payment.method) {
      case 'paypal':
        return 'Paypal';
      case 'hostedFields':
        return 'Credit Card';
      case 'venmo':
        return 'Venmo';
      default:
        return 'No Payment Method Selected';
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    server
      .post('/checkout', {
        paymentMethodNonce: 'fake-valid-nonce',
        amount: '10',
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <section className="orderConfirmation">
        <CartContents totalCallback={(total) => this.setState({ total })} />
        <ShippingAddress />
        {this.props.payment.billingAddress ? (
          <BillingAddress />
        ) : (
          <p>Billing Address Same as Shipping</p>
        )}
        <p>
          <strong>Payment Method: </strong> {this.paymentMethodDisplay()}
        </p>
        <Button onClick={this.onSubmit}>Submit Order</Button>
      </section>
    );
  }
}

const mapStateToProps = ({ checkout }) => ({
  shippingAddress: checkout.shippingAddress,
  billingAddress: checkout.billingAddress,
  payment: checkout.payment,
});

const mapDispatchToProps = (dispatch) => ({
  sendOrderToServer: () => dispatch(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation);
