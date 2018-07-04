
import * as React from 'react';
import axios from 'axios';
import client from 'braintree-web/client';
import base from './base';
// components
import { StatusSwitch } from 'njmyers-component-library';

type Props = {
  loadedAt: number,
  status: string,
  clientTokenRequest: Function,
  clientTokenCancelRequest: Function,
  children?: React.Node,
};

type State = {
  cancelSource: {},
  status: 'initial' | 'loading' | 'resolved' | 'error',
};

const server = axios.create({
  baseURL: base(),
});

class BraintreeProvider extends React.PureComponent<Props, State> {
  state = {
    status: 'initial',
    cancelSource: axios.CancelToken.source(),
  };

  componentDidMount() {
    this.createBraintreeClient();
  }

  createBraintreeClient = () => {
    server
      .get('/client_token', {
        cancelToken: this.state.cancelSource.token,
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
    if (this.state.status !== 'resolved') {
      this.state.cancelSource('cancelling token request');
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
