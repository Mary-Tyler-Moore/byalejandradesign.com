/** @flow */
import * as React from 'react';
import { Form } from '@njmyers/component-library';
import Button from '../Button';
// types
import type { State } from './types';
// styles
import './email-signup.sass';

class EmailSignup extends React.Component<{}, State> {
  state = {
    email: '',
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {
      currentTarget: { value },
    } = e;

    this.setState((state) => ({
      email: value,
    }));
  };

  onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState((state) => ({ email: '' }));
  };

  render() {
    return (
      <form name="emailSignup" className="emailSignup" onSubmit={this.onSubmit}>
        <Form.Input
          block="emailSignup"
          name="email"
          label="Signup For Our Newsletter"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    );
  }
}

export default EmailSignup;
