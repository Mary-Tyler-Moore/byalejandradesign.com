/** @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Button from '../../Button';
import { validateAddress } from '@byalejandradesign/checkout-objects';
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
// types
import type { Address } from '@byalejandradesign/checkout-objects';

const BillingAddressForm = createAddressForm('billingAddress');
const ShippingAddressForm = createAddressForm('shippingAddress');

type Props = {
  hasBillingAddress: boolean,
  setBillingAddress: (param: boolean) => mixed,
  billingAddress: Address,
  shippingAddress: Address,
};

type State = {
  focusFields: Array<string>,
  status: 'initial' | 'invalid',
};

class AddressForms extends React.PureComponent<Props, State> {
  state = {
    focusFields: [''],
    status: 'initial',
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    // e.preventDefault();

    const {
      currentTarget: { checked },
    } = e;

    this.props.setBillingAddress(checked);
  };

  onSubmit = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { valid: shippingValid, fields: shippingFields } = validateAddress(
      this.props.shippingAddress
    );

    const { valid: billingValid, fields: billingFields } = validateAddress(
      this.props.billingAddress
    );

    if (shippingValid || (this.props.hasBillingAddress && billingValid)) {
      navigate('/checkout/payment-method');
    } else {
      this.setState((state) => ({
        focusFields: [
          ...shippingFields,
          ...(this.props.hasBillingAddress ? billingFields : []),
        ],
        status: 'invalid',
      }));
    }
  };

  onEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {
      currentTarget: { value },
    } = e;

    this.props.updateEmail(value);
  };

  render() {
    return (
      <React.Fragment>
        <h4 className="h4-roboto">Shipping Address</h4>
        <form className="addressForm_form" onSubmit={this.onSubmit}>
          <ShippingAddressForm focus={this.state.focusFields} />
          <Form.Input
            block="addressField"
            value={this.props.email}
            name="email"
            onChange={this.onEmail}
            type="email"
            required
          />
          <section className="addressToggle">
            <input
              className="addressToggle_input"
              type="checkbox"
              onChange={this.onChange}
              checked={this.props.hasBillingAddress}
            />
            <span>
              Click Here if Billing Address is different then Shipping Address
            </span>
          </section>
          {this.props.hasBillingAddress && (
            <React.Fragment>
              <h4 className="addressForm_h4">Billing Address</h4>
              <BillingAddressForm />
            </React.Fragment>
          )}
          <section className="addressNavigation">
            <Button fullWidth margin type="submit">
              Payment&nbsp;Info
            </Button>
          </section>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  billingAddress: state.checkout.billingAddress,
  shippingAddress: state.checkout.shippingAddress,
  hasBillingAddress: state.checkout.payment.billingAddress,
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
