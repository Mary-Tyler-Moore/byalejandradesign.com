import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'smalldash';

import Cart from '../../Cart';
import createAddressDisplay from '../Address/DisplayAddress';

const ShippingAddress = createAddressDisplay('shippingAddress');

class Confirmation extends PureComponent {
  constructor(props) {
    super(props);
    // make sure everything is set
    if (process.env.NODE_ENV !== 'production') this.validatePreviousSteps();
  }

  validatePreviousSteps = () => {
    this.props.history.push('/checkout/shipping-address');
  };

  render() {
    return (
      <section className="orderConfirmation">
        <Cart />
        <ShippingAddress />
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
