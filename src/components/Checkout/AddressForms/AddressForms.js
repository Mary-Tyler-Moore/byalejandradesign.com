import * as React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import Button from '../../Button';
// components
import { createAddressForm } from '../create-address';
// actions
import { billingAddress } from '../redux/actions/payment-methods-actions';
// styles
import './address-forms.sass';

const BillingAddressForm = createAddressForm('billingAddress');
const ShippingAddressForm = createAddressForm('shippingAddress');

class AddressForms extends React.PureComponent {
  onSubmit = (event) => {
    console.log(event.currentTarget);
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

  render() {
    return (
      <React.Fragment>
        <section className="shippingAddress">
          <ShippingAddressForm />
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
          <Button onClick={this.onClick}>Payment Info</Button>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  billingAddress: state.checkout.payment.billingAddress,
});

const mapDispatchToProps = (dispatch) => ({
  setBillingAddress: (value) => dispatch(billingAddress(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForms);
