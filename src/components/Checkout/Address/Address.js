import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'gatsby';
// actions
import { updateAddressField, validateAddress } from './address-actions';
// components
import createAddressForm from './create-address-form';
// styles
import './address.sass';

const ShippingAddress = createAddressForm('shippingAddress');

class Address extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      billingIsShipping: false,
    };
  }

  onCheckBilling = (event) => {
    this.props.updateAddressDirectly(event);
    this.setState((state) => ({ billingIsShipping: !state.billingIsShipping }));
  };

  validateForm = () => {
    this.props.validateAddress();
  };

  render() {
    return (
      <React.Fragment>
        <ShippingAddress />
        <button onClick={this.validateForm}>Validate</button>
        <Link to="/checkout/payment-method">To Payment Method</Link>
      </React.Fragment>
    );
  }
}

/**
 * Instead of passing checkout object pass each key on checkout as an individual prop
 * @param {*} state redux state
 */
const mapStateToProps = (state) => {
  const keys = Object.keys(state.checkout);
  const props = {};
  keys.forEach((key) => (props[key] = state.checkout[key]));
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  updateAddressField: (action) => dispatch(updateAddressField(action)),
  validateAddress: () => dispatch(validateAddress()),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  /**
   * Copies Shipping Address values to Billing Address by accessing state
   * @param {object} event synthetic react event
   */
  updateAddressDirectly: (event) => {
    const { checked } = event.target;
    const keys = Object.keys(stateProps.shippingAddress);
    keys.forEach((key) => {
      dispatchProps.updateAddressField({
        slice: 'billingAddress',
        payload: checked ? stateProps.shippingAddress[key] : '',
        key,
      });
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Address);
