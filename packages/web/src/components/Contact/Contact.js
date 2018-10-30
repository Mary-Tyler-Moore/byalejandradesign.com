import * as React from 'react';
// import axios from 'axios';
// reducer
import contactReducer from './contact-reducer';
import type { State } from './contact-reducer';
// actions
import { updateContactForm, submitContactForm } from './contact-actions';
import type { Actions } from './contact-actions';
// components
import { Form, StatusSwitch } from '@njmyers/component-library';
// styles
import './contact.sass';

class Contact extends React.PureComponent<{}, State> {
  state = {
    name: '',
    subject: '',
    email: '',
    message: '',
    status: 'initial',
  };

  logAction = (prev: State) => (action: Actions) => (next: State) => {
    console.log({
      prev,
      action,
      next,
    });
  };

  submitRequest = (action: Actions, state: State) => {
    // if (action.type === 'SUBMIT_CONTACT_FORM') {
    //   // set state to loading
    //   this.setState({ status: 'loading' });
    //   // make request
    //   try {
    //     const response = await axios({
    //       url: `${process.env.REACT_APP_MAIL_URL}/send/byalejandradesign`,
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: process.env.REACT_APP_MAIL_API_KEY,
    //       },
    //       data: this.state,
    //     });
    //
    //     console.log(response);
    //   } catch (e) {
    //     this.dispatch(submitFormError(e));
    //   }
    // }
  };

  dispatch = (action: Actions) => {
    // do side effects
    this.submitRequest(action, this.state);
    // do reduction
    this.setState((prevState) => {
      // generate next state
      const nextState: State = contactReducer(prevState, action);
      // state logging
      if (process.env.NODE_ENV !== 'production') {
        this.logAction(prevState)(action)(nextState);
      }
      // return next state to react
      return nextState;
    });
  };

  onChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.dispatch(updateContactForm(name, value));
  };

  onSubmit = (event: SyntheticEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.dispatch(submitContactForm());
  };

  render() {
    return (
      <section className="contact">
        <h3 className="contact_h3">Contact Artetexture</h3>
        <form className="contactForm" onSubmit={this.onSubmit}>
          <Form.Input
            name="name"
            block="contactFormField"
            label="Full Name"
            placeholder="Nicholas"
            value={this.state.name}
            onChange={this.onChange}
            required
            focus
          />
          <Form.Input
            name="subject"
            block="contactFormField"
            placeholder="Customer Support"
            value={this.state.subject}
            onChange={this.onChange}
            required
          />
          <Form.Input
            name="email"
            type="email"
            block="contactFormField"
            value={this.state.email}
            placeholder="nick@byalejandradesign.com"
            onChange={this.onChange}
            required
          />
          <Form.TextArea
            block="contactFormField"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
            rows={8}
            required={true}
          />
          <Form.Submit block="contactFormSubmit" value="Send" />
        </form>
        <StatusSwitch status={this.state.status}>
          <p className="message">{this.state.status}</p>
        </StatusSwitch>
      </section>
    );
  }
}

export default Contact;
