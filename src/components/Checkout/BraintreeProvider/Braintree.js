import * as React from 'react';
import { CancelToken } from 'axios';
import client from 'braintree-web/client';
import server from '../server';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusSwitch } from '@njmyers/component-library';
// style
import './braintree.sass';

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

const ErrorMessage = (props) => (
  <p className="braintree_error">Error loading. Please reload this page.</p>
);

const Loading = (props) => (
  <section className="braintree_spinner">
    <FontAwesomeIcon icon="spinner" size="2x" pulse />
  </section>
);

class Braintree extends React.PureComponent<Props, State> {
  state = {
    status: 'loading',
  };

  cancel = null;

  componentDidMount() {
    this.setState({ status: 'loading' });
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
