import React, { PureComponent } from 'react';
import Button from '../../../Button';
import { hostedFields } from 'braintree-web';
import { equals } from 'smalldash';
// types
import type { PaymentState } from '../payment-methods-reducer';
// actions
import withPaymentActions from '../with-payment-actions';
// components
import CardIcons from './CardIcons';
import HostedField from './Field';
import BillingAddress from '../../Address/BillingAddress';
//types
import type { FieldState } from './types';
// style
import './hosted-fields.sass';

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
      input: 'brainTreeIframe_input',
      '.valid': 'brainTreeIframe_input-valid',
      '.invalid': 'brainTreeIframe_input-invalid',
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
    instance: null,
  };

  componentDidMount() {
    hostedFields
      .create({
        client: this.props.braintree.client,
        ...this.options,
      })
      .then((instance) => {
        this.setState({ instance });
      })
      .catch((error) => {
        this.props.paymentError(error);
      });
  }

  componentWillUnmount() {
    if (this.state.instance) {
      this.state.instance.teardown();
    }
  }

  /**
   * Set up the event listeners from the hosted fields instance
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.instance && this.state.instance) {
      this.state.instance.on('cardTypeChange', this.onCardTypeChange);
      this.state.instance.on('focus', this.storeFieldStatus);
      this.state.instance.on('validityChange', this.storeFieldStatus);
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
      Promise.resolve(this.state.instance.tokenize())
        .then((payload) => {
          this.props.submitNonce(payload);
          this.setState({ status: 'resolved' });
        })
        .catch((err) => {
          this.setState({ status: 'error' });
          this.props.paymentError(err);
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
      <section className="hostedFields">
        {/* <BillingAddress /> */}
        <section>
          <h5 className="hostedFields_h5">Credit Card Details</h5>
          <CardIcons active={this.state.cardType} />
          <form className="hostedFields_form">
            <HostedField
              type="cardNumber"
              fieldState={this.state.fields.cardNumber}
            />
            <HostedField
              type="expirationDate"
              fieldState={this.state.fields.expirationDate}
            />
            <HostedField type="cvv" fieldState={this.state.fields.cvv} />
          </form>
          <section className="hostedFields_feedbackRow">
            <p
              className="hostedFields_invalidNotice"
              modifiers={this.state.status}
            >
              Your credit card information is invalid
            </p>
            <Button className="hostedFields_button" onClick={this.onSubmit}>
              Submit Credit Card
            </Button>
          </section>
        </section>
      </section>
    );
  }
}

export default withPaymentActions(HostedFields);
