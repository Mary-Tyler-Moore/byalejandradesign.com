/** @flow */
import * as React from 'react';
import { CancelToken } from 'axios';
import client from 'braintree-web/client';
import server from '../server';
// components
import Loading from '../../Loading';
import ErrorMessage from '../../ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusSwitch } from '@njmyers/component-library';
// style
import './braintree.sass';

type Props = {
  loadedAt: number,
  status: string,
  saveError: (error: Error | null) => any,
  saveClient: (client: {}) => any,
  children: React.Node,
  client: {} | null,
};

type State = {
  status: 'initial' | 'loading' | 'resolved' | 'error',
};

class Braintree extends React.Component<Props, State> {
  state = {
    status: 'initial',
  };

  cancel = null;

  componentDidMount() {
    this.setState({ status: 'loading' });
    this.createBraintreeClient();
  }

  onError = (error: Error | null) => {
    if (error) {
      this.setState({ status: 'error' });
      this.props.saveError(error);
    }
  };

  onResponse = (response) => {
    // returns a promise
    return client.create({
      authorization: response.data.clientToken,
    });
  };

  onInstance = (client) => {
    this.props.saveClient(client);
    // set state after saving client please
    this.setState({
      status: 'resolved',
    });
  };

  createBraintreeClient = () => {
    server
      .get('/client_token', {
        cancelToken: new CancelToken((c) => {
          this.cancel = c;
        }),
      })
      .then(this.onResponse)
      .then(this.onInstance)
      .catch(this.onError);
  };

  componentWillUnmount() {
    if (this.state.status !== 'resolved' && typeof this.cancel === 'function') {
      this.cancel('cancelling token request');
    }

    if (this.props.client) {
      this.props.client.teardown(this.onError);
    }
  }

  render() {
    return (
      <StatusSwitch
        status={this.state.status}
        error={ErrorMessage}
        loading={Loading}
      >
        {this.props.children}
      </StatusSwitch>
    );
  }
}

export default Braintree;
