import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { camelToTitle, camelToPascal } from 'smalldash';
// components
import { Form } from '@njmyers/component-library';
// actions
import { updateAddressField } from './address-actions';
// datasets
import geography from './geography';

/**
 * fullName: '',
 * streetAddress1: '',
 * streetAddress2: '',
 * city: '',
 * province: '',
 * postalCode: '',
 * countryCode: '',
 */

const Input = Form.Input;
/** stub with defaults */
Input.defaultProps = {
  ...Input.defaultProps,
  required: true,
  block: 'addressInput',
};

const Select = Form.Select;
/** stub with defaults */
Select.defaultProps = {
  ...Select.defaultProps,
  required: true,
  block: 'addressSelect',
};

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
        <section className="addressForm">
          <h3 className="addressForm_h3">{this.titleCase}</h3>
          <form className="addressForm_form" onSubmit={this.props.onSubmit}>
            <Input
              focus
              name="fullName"
              label="Full Name"
              value={this.props[slice].fullName}
              onChange={this.props.updateAddressField}
            />
            <Input
              name="streetAddress1"
              label="Address Line 1"
              value={this.props[slice].streetAddress1}
              onChange={this.props.updateAddressField}
            />
            <Input
              name="streetAddress2"
              label="Address Line 2"
              value={this.props[slice].streetAddress2}
              onChange={this.props.updateAddressField}
            />
            <Input
              name="city"
              value={this.props[slice].city}
              onChange={this.props.updateAddressField}
              modifiers="half"
            />
            <Select
              name="province"
              label={geography[this.props[slice].countryCode].provincialKey}
              options={this.getProvinceOptions()}
              value={this.props[slice].province}
              onChange={this.props.updateAddressField}
              modifiers={['allCapOptions', 'sixth']}
            />
            <Input
              name="postalCode"
              label="Postal Code"
              type="text"
              value={this.props[slice].postalCode}
              onChange={this.validatePostalCode}
              modifiers="third"
            />
            <Select
              name="countryCode"
              options={this.getCountryOptions()}
              value={this.props[slice].countryCode}
              onChange={this.onSelectCountry}
              modifiers="capOptions"
            />
          </form>
        </section>
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
