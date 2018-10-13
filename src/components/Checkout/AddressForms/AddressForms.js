import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Button from '../../Button';
import { Form } from '@njmyers/component-library';
// components
import { createAddressForm } from '../create-address';
// actions
import {
  billingAddress,
  updateEmail,
} from '../redux/actions/payment-methods-actions';
// styles
import './address-forms.sass';

const BillingAddressForm = createAddressForm('billingAddress');
const ShippingAddressForm = createAddressForm('shippingAddress');

class AddressForms extends React.PureComponent {
  onSubmit = (event) => {
    navigate('/checkout/payment-method');
  };

  onChange = (event) => {
    const {
      currentTarget: { checked },
    } = event;

    this.props.setBillingAddress(checked);
  };

  onClick = () => {
    navigate('/checkout/payment-method');
  };

  onEmail = (event) => {
    event.preventDefault();
    this.props.updateEmail(event.currentTarget.value);
  };

  render() {
    return (
      <React.Fragment>
        <section className="shippingAddress">
          <ShippingAddressForm />
          <Form.Input
            block="addressField"
            value={this.props.email}
            name="email"
            onChange={this.onEmail}
            type="email"
          />
        </section>
        <section className="addressToggle">
          <input
            className="addressToggle_input"
            type="checkbox"
            onChange={this.onChange}
            checked={this.props.billingAddress}
          />
          <span>
            Click Here if Billing Address is different then Shipping Address
          </span>
        </section>
        {this.props.billingAddress && (
          <section className="billingAddress">
            <BillingAddressForm />
          </section>
        )}
        <section className="addressNavigation">
          <Button fullWidth margin onClick={this.onClick}>
            Payment Info
          </Button>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  billingAddress: state.checkout.payment.billingAddress,
  email: state.checkout.payment.email,
});

const mapDispatchToProps = (dispatch) => ({
  setBillingAddress: (value) => dispatch(billingAddress(value)),
  updateEmail: (value) => dispatch(updateEmail(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForms);
