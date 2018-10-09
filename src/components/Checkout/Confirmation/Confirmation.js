import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'smalldash';

import CartContents from '../../CartContents';
import createAddressDisplay from '../DisplayAddress';

const ShippingAddress = createAddressDisplay('shippingAddress');
const BillingAddress = createAddressDisplay('billingAddress');

class Confirmation extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   // make sure everything is set
  //   if (process.env.NODE_ENV !== 'production') this.validatePreviousSteps();
  // }
  //
  // validatePreviousSteps = () => {
  //   this.props.history.push('/checkout/shipping-address');
  // };

  render() {
    return (
      <section className="orderConfirmation">
        <CartContents />
        <ShippingAddress />
        <BillingAddress />
      </section>
    );
  }
}

const mapStateToProps = ({ checkout }) => ({
  shippingAddress: checkout.shippingAddress,
});

const mapDispatchToProps = (dispatch) => ({
  sendOrderToServer: () => dispatch(),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Confirmation);
