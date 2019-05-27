/** @flow */
import * as React from 'react';
import { Form } from '@njmyers/component-library';
import Button from '../Button';
import Loading from '../Loading';
import server from './server';
// types
import type { State } from './types';
// styles
import './email-signup.sass';

class EmailSignup extends React.Component<{}, State> {
  state = {
    address: '',
    message: '',
    loading: false,
  };

  onChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {
      currentTarget: { value },
    } = e;

    this.setState((state) => ({
      address: value,
      message: '',
    }));
  };

  onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { address } = this.state;

    this.setState({
      loading: true,
    });

    server
      .post('/subscribe', { members: [{ address }] })
      .then((response) =>
        this.setState({
          address: '',
          loading: false,
          message: 'Successfully subscribed',
        })
      )
      .catch((e) =>
        this.setState((state) => ({
          loading: false,
          message: 'Error subscribing, please try again.',
        }))
      );
  };

  render() {
    const { message, address, loading } = this.state;
    return (
      <form name="emailSignup" className="emailSignup" onSubmit={this.onSubmit}>
        {loading && <Loading />}
        <Form.Input
          block="emailSignup"
          name="email"
          label="Signup For Our Newsletter"
          type="email"
          placeholder={message}
          value={address}
          onChange={this.onChange}
          required
        />
        <Button type="submit">Sign Up</Button>
      </form>
    );
  }
}

export default EmailSignup;
