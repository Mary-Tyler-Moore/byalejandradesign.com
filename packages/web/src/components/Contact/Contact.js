import * as React from 'react';
import server from './server';
// reducer
import contactReducer from './contact-reducer';
import type { State } from './contact-reducer';
// actions
import {
  updateContactForm,
  submitContactForm,
  submitFormError,
  submitFormSuccess,
} from './contact-actions';
import type { Actions } from './contact-actions';
// components
import { Form } from '@njmyers/component-library';
import Loading from '../Loading';
// styles
import './contact.sass';

class Contact extends React.PureComponent<{}, State> {
  state = {
    name: '',
    subject: '',
    email: '',
    message: '',
    status: 'initial',
    userMessage: '',
  };

  logAction = (prev: State) => (action: Actions) => (next: State) => {
    console.log({
      prev,
      action,
      next,
    });
  };

  submitRequest = async () => {
    // make request
    try {
      const response = await server.post('/contact', this.state);

      const status = response.data.status;

      if (status >= 200 && status < 300) {
        this.dispatch(submitFormSuccess());
      } else {
        this.dispatch(submitFormError(response.data));
      }
    } catch (e) {
      this.dispatch(submitFormError(e));
    }
  };

  sideEffects = (action: Actions) => {
    // return function
    // dispatch will take care of executing the function at the correct time
    switch (action.type) {
      case 'SUBMIT_CONTACT_FORM':
        return this.submitRequest;
      default:
        return () => null;
    }
  };

  dispatch = (action: Actions) => {
    // do reduction
    this.setState((prevState) => {
      // generate next state
      const nextState: State = contactReducer(prevState, action);
      // state logging
      if (process.env.GATSBY_STAGE !== 'production') {
        this.logAction(prevState)(action)(nextState);
      }

      return nextState;
      // do side effects AFTER state is async set by react.
    }, this.sideEffects(action));
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    this.dispatch(updateContactForm(name, value));
  };

  onSubmit = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.dispatch(submitContactForm());
  };

  statusMessage = () => {
    switch (this.state.status) {
      case 'resolved':
      case 'error':
        return (
          <p className={`message message-${this.state.status}`}>
            <em>{this.state.userMessage}</em>
          </p>
        );
      case 'loading':
        return <Loading />;
      default:
        return null;
    }
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
            required
          />
          <Form.Submit block="contactFormSubmit" value="Send" />
        </form>
        {this.statusMessage()}
      </section>
    );
  }
}

export default Contact;
