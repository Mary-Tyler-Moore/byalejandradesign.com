import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { camelToTitle, camelToPascal } from 'smalldash';
// components
import { Form } from '@njmyers/component-library';
// actions
import { updateAddressField } from '../redux/actions/address-actions';
// datasets
import geography from './geography';
// styles
import './create-address-form.sass';

/**
 * fullName: '',
 * streetAddress1: '',
 * streetAddress2: '',
 * city: '',
 * province: '',
 * postalCode: '',
 * countryCode: '',
 */

// TODO: FIX CANADIAN ZIP REGEX

/**
 * Creates address based on which address to modify billing/shipping
 * @param {string} slice redux key for which slice of redux state to access
 * @return {class} returns a react class with all redux plumbing
 */
const createAddressForm = (slice) => {
  class Address extends PureComponent {
    constructor(props) {
      super(props);
      // transform keyword to different cases
      this.pascalCase = camelToPascal(slice);
      this.titleCase = camelToTitle(slice);
    }

    createPostalRegex = () => {
      switch (this.props[slice].countryCode) {
        case 'US':
        default:
          return /^[0-9]{0,5}-*[0-9]{0,4}$/;
        case 'CA':
          return /^[A-Za-z]?\d?[A-Za-z]?[ -]?\d?[A-Za-z]?\d$/;
      }
    };

    createPostalSeperatorLength = () => {
      switch (this.props[slice].countryCode) {
        case 'US':
        default:
          return 5;
        case 'CA':
          return 3;
      }
    };

    /**
     * Validate zip codes in React! Don't even bother redux if it fails
     * @param {object} event synthetic react event from onChange
     */
    validatePostalCode = ({ target: { name, value } }) => {
      const regex = this.createPostalRegex();
      const length = this.createPostalSeperatorLength();

      // auto-add dashes when typing
      const payload =
        value.length !== length
          ? value
          : this.props[slice].postalCode.length < value.length
            ? `${value}-`
            : value;

      if (regex.test(value))
        this.props.manuallyUpdateAddressField({
          key: name,
          payload,
        });
    };

    resetField = (key) => {
      this.props.manuallyUpdateAddressField({ payload: '', key });
    };

    onSelectCountry = (event) => {
      this.props.updateAddressField(event);
      this.resetField('province');
      this.resetField('postalCode');
    };

    getProvinceOptions = () => {
      return Object.keys(
        geography[this.props[slice].countryCode].provinces
      ).map((key) => ({
        name: key,
        value: key,
      }));
    };

    getCountryOptions = () => {
      return Object.keys(geography).map((key) => ({
        name: geography[key].name,
        value: geography[key].countryCode,
      }));
    };

    render() {
      return (
        <React.Fragment>
          <h4 className="addressForm_h4">{this.titleCase}</h4>
          <form className="addressForm_form" onSubmit={this.props.onSubmit}>
            <Form.Input
              focus
              name="firstName"
              label="First Name"
              block="addressField"
              value={this.props[slice].firstName}
              onChange={this.props.updateAddressField}
              modifiers={['half']}
              required
            />
            <Form.Input
              focus
              name="lastName"
              label="Last Name"
              block="addressField"
              value={this.props[slice].lastName}
              onChange={this.props.updateAddressField}
              modifiers={['half']}
              required
            />
            <Form.Input
              name="streetAddress1"
              label="Address Line 1"
              block="addressField"
              value={this.props[slice].streetAddress1}
              onChange={this.props.updateAddressField}
              required
            />
            <Form.Input
              name="streetAddress2"
              label="Address Line 2"
              block="addressField"
              value={this.props[slice].streetAddress2}
              onChange={this.props.updateAddressField}
              required
            />
            <Form.Input
              name="city"
              block="addressField"
              value={this.props[slice].city}
              onChange={this.props.updateAddressField}
              modifiers="half"
              required
            />
            <Form.Select
              name="province"
              block="addressSelect"
              label={geography[this.props[slice].countryCode].provincialKey}
              options={this.getProvinceOptions()}
              value={this.props[slice].province}
              onChange={this.props.updateAddressField}
              modifiers="sixth"
              required
            />
            <Form.Input
              name="postalCode"
              label="Postal Code"
              block="addressField"
              type="text"
              value={this.props[slice].postalCode}
              onChange={this.validatePostalCode}
              modifiers="third"
              required
            />
            <Form.Select
              name="countryCode"
              block="addressSelect"
              label="Country"
              options={this.getCountryOptions()}
              value={this.props[slice].countryCode}
              onChange={this.onSelectCountry}
              required
            />
          </form>
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => ({
    [slice]: state.checkout[slice],
  });

  const mapDispatchToProps = (dispatch) => ({
    updateAddressField: (event) => {
      dispatch(
        updateAddressField({
          slice,
          payload: event.target.value,
          key: event.target.name,
        })
      );
    },
    manuallyUpdateAddressField: (object) =>
      dispatch(updateAddressField({ slice, ...object })),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Address);
};

export default createAddressForm;