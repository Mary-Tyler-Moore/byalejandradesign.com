import * as React from 'react';
import axios, { CancelToken } from 'axios';
import client from 'braintree-web/client';
import server from '../server';
// components
import { StatusSwitch } from '@njmyers/component-library';

type Props = {
  loadedAt: number,
  status: string,
  clientTokenRequest: Function,
  clientTokenCancelRequest: Function,
  children?: React.Node,
};

type State = {
  status: 'initial' | 'loading' | 'resolved' | 'error',
};

class BraintreeProvider extends React.PureComponent<Props, State> {
  state = {
    status: 'initial',
  };

  cancel = null;

  componentDidMount() {
    this.createBraintreeClient();
  }

  createBraintreeClient = () => {
    server
      .get('/client_token', {
        cancelToken: new CancelToken((c) => {
          this.cancel = c;
        }),
      })
      .then((res) =>
        client.create({
          authorization: res.data.clientToken,
        })
      )
      .then((instance) => {
        this.props.saveClient(instance);
        this.setState({ status: 'resolved' });
      })
      .catch((err) => {
        this.props.braintreeError(err);
        this.setState({ status: 'error' });
      });
  };

  componentWillUnmount() {
    if (this.state.status !== 'resolved' && typeof this.cancel === 'function') {
      this.cancel('cancelling token request');
    }
  }

  render() {
    return (
      <StatusSwitch status={this.state.status}>
        {this.props.children}
      </StatusSwitch>
    );
  }
}

export default BraintreeProvider;
