// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { equals, compose } from 'smalldash';
// types
import type { PaymentState } from '../payment-methods-reducer';
// actions
import {
  createPaymentInstance,
  cancelCreatePaymentInstance,
  createPaymentInstanceError,
  savePaymentNonce,
} from '../payment-methods-actions';
// components
import CardIcons from './CardIcons';
import Field from './Field';
import BillingAddress from '../../Address/BillingAddress';
import { BEM } from 'njmyers-component-library';
// misc
import './hosted-fields.sass';

export type FieldState = {
  isPotentiallyValid: boolean,
  isValid: boolean,
  isFocused: boolean,
};

type State = {
  cardType: string,
  fields: {
    cardNumber: FieldState,
    expirationDate: FieldState,
    cvv: FieldState,
  },
  status: string,
};

type Props = {
  hostedFieldsCreateInstance: Function,
  hostedFieldsError: Function,
  payment: PaymentState,
};

class HostedFields extends PureComponent<Props, State> {
  // options for hosted fields instantiation
  options = {
    styles: {
      input: 'hostedField_input',
      '.number': 'hostedField_input-cardNumber',
      '.expirationDate': 'hostedField_input-expirationDate',
      '.valid': 'hostedField_input-valid',
      '.invalid': 'hostedField_input-invalid',
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '1111 1111 1111 1111',
        maskInput: true,
      },
      cvv: {
        selector: '#cvv',
        placeholder: '•••',
        maskInput: true,
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: '10/2019',
      },
    },
  };

  // initial state for a field -- lifting state up
  initialFieldState: FieldState = {
    isPotentiallyValid: true,
    isValid: false,
    isFocused: false,
  };

  state: State = {
    cardType: '',
    fields: {
      cardNumber: this.initialFieldState,
      expirationDate: this.initialFieldState,
      cvv: this.initialFieldState,
    },
    status: 'initial',
  };

  componentDidMount() {
    this.props.hostedFieldsCreateInstance(this.options);
  }

  /**
   * Set up the event listeners from the hosted fields instance
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    if (
      this.props.payment.status === 'resolved' &&
      prevProps.payment.instance !== 'resolved'
    ) {
      this.props.payment.instance.on('cardTypeChange', this.onCardTypeChange);
      this.props.payment.instance.on('focus', this.storeFieldStatus);
      this.props.payment.instance.on('validityChange', this.storeFieldStatus);
    }
  }

  /**
   * Checks to see if the hosted fields are all valid
   * @return {bool} returns a single boolean value
   */
  validateAllFields = () => {
    return Object.keys(this.state.fields).reduce(
      (bool, key) => bool && this.state.fields[key].isValid,
      true
    );
  };

  /**
   * Controls the flow for submitting payment information
   * @param {object} event react synthetic event
   */
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ status: 'loading' });
    // validate all hosted card fields
    if (this.validateAllFields()) {
      Promise.resolve(this.props.payment.instance.tokenize())
        .then((payload) => {
          this.props.hostedFieldsNonce(payload);
          this.setState({ status: 'resolved' });
        })
        .catch((err) => {
          this.setState({ status: 'error' });
          this.props.hostedFieldsError({
            type: 'CREDIT_CARD_TOKENIZE_ERROR',
            err,
          });
        });
    } else {
      this.setState({ status: 'error' });
    }
  };

  /**
   * Helper function to match events emitted by hosted fields to the component key names
   * @param {string} key input key from hosted fields event
   * @return {string} output key renamed to match field type prop
   */
  renameKey = (key) => {
    switch (key) {
      case 'number':
        return 'cardNumber';
      default:
        return key;
    }
  };

  /**
   * Copies the field states safely from hosted events to component state
   * TODO: make this easier to understand
   * @param {object} fields the fields property from the hosted field event
   */
  storeFieldStatus = ({ fields } = {}) => {
    // reset error status this is the callback instead of onChange because hosted fields
    this.setState({ status: 'initial' });

    const newFields = {};

    Object.keys(fields).forEach((field) => {
      const fieldName = this.renameKey(field);
      newFields[fieldName] = {};
      Object.keys(fields[field]).forEach((key) => {
        if (key !== 'container') newFields[fieldName][key] = fields[field][key];
      });
    });

    this.setState(
      (state) =>
        !equals(newFields, state.fields) ? { fields: newFields } : null
    );
  };

  /**
   * Set state of selected card when card number matches one available type
   * @param {object} event synthetic react event
   */
  onCardTypeChange = (event) => {
    const types = event.cards.map((card) => card.type);
    const cardType = types.length === 1 ? types[0] : '';
    this.setState({
      cardType,
    });
  };

  render() {
    return (
      <BEM block="hostedFields">
        <section>
          <BillingAddress />
          <h3 element="h3">Credit Card Details</h3>
          <CardIcons active={this.state.cardType} />
          <form element="form">
            <Field type="cardNumber" state={this.state.fields.cardNumber} />
            <Field
              type="expirationDate"
              state={this.state.fields.expirationDate}
            />
            <Field type="cvv" state={this.state.fields.cvv} />
          </form>
          <section element="feedbackRow">
            <p element="invalidNotice" modifiers={this.state.status}>
              Your credit card information is invalid
            </p>
            <button element="submit" onClick={this.onSubmit}>
              Submit Payment
            </button>
          </section>
        </section>
      </BEM>
    );
  }
}

const mapStateToProps = (state) => ({
  payment: state.checkout.payment,
});

const mapDispatchToProps = (dispatch) => ({
  hostedFieldsNonce: (payload) =>
    dispatch(savePaymentNonce('hostedFields')(payload)),
  hostedFieldsError: (err) =>
    dispatch(createPaymentInstanceError('hostedFields')(err)),
  hostedFieldsCreateInstance: (options) =>
    dispatch(createPaymentInstance('hostedFields')(options)),
  hostedFieldsCancelInstance: () =>
    dispatch(cancelCreatePaymentInstance('hostedFields')()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(HostedFields);
