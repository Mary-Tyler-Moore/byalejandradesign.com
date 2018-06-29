// @flow
import * as React from 'react';
// import axios from 'axios';
// reducer
import contactReducer from './contact-reducer';
import type { State } from './contact-reducer';
// actions
import { updateContactForm, submitContactForm } from './contact-actions';
import type { Actions } from './contact-actions';
// components
import { Form, StatusSwitch } from 'njmyers-component-library';
// styles
import './contact.sass';

const Input = Form.Input;
Input.defaultProps = {
  ...Form.Input.defaultProps,
  required: true,
  block: 'contactFormItem',
};

const Submit = Form.Submit;
Submit.defaultProps = {
  ...Form.Submit.defaultProps,
  block: 'contactFormSubmit',
};

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
    //       url: `${process.env.REACT_APP_MAIL_URL}/send/artetexture`,
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
      <section className="contact" onSubmit={this.onSubmit}>
        <h1 className="contact_heading">Contact Artetexture</h1>
        <form className="contactForm">
          <Input
            name="name"
            label="Full Name"
            placeholder="Nicholas"
            value={this.state.name}
            onChange={this.onChange}
            focus={true}
          />
          <Input
            name="subject"
            placeholder="Customer Support"
            value={this.state.subject}
            onChange={this.onChange}
          />
          <Input
            name="email"
            type="email"
            value={this.state.email}
            placeholder="nick@artetexture.com"
            onChange={this.onChange}
          />
          <Form.TextArea
            block="contactFormTextArea"
            name="message"
            onChange={this.onChange}
            value={this.state.message}
            rows={8}
            required={true}
          />
          <StatusSwitch status={this.state.status}>
            <p className="message">{this.state.status}</p>
          </StatusSwitch>
          <Submit value="&#xf1d8;" />
        </form>
      </section>
    );
  }
}

export default Contact;
