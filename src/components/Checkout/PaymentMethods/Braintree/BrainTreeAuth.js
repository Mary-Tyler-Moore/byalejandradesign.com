// @flow
import * as React from 'react';
import { connect } from 'react-redux';
// actions
import {
  clientTokenRequest,
  clientTokenCancelRequest,
} from './braintree-actions';
// components
import { StatusSwitch } from 'njmyers-component-library';

type ReduxProps = {
  loadedAt: number,
  status: string,
  clientTokenRequest: Function,
  clientTokenCancelRequest: Function,
  children?: React.Node,
};

/**
 * TODO:
 * add retry on clientToken request
 **/
class BrainTreeAuth extends React.PureComponent<ReduxProps> {
  componentWillMount() {
    this.props.clientTokenRequest();
  }

  componentWillUnmount() {
    if (this.props.status !== 'resolved' || this.validateLoadTime())
      this.props.clientTokenCancelRequest();
  }

  validateLoadTime = (minutes = 10) => {
    return Date.now() - this.props.loadedAt < 3600 * minutes;
  };

  render() {
    return (
      <StatusSwitch status={this.props.status}>
        {this.props.children}
      </StatusSwitch>
    );
  }
}

const mapStateToProps = (state) => ({
  loadedAt: state.checkout.braintree.loadedAt,
  status: state.checkout.braintree.status,
  client: state.checkout.braintree.client,
});

const mapDispatchToProps = (dispatch) => ({
  clientTokenRequest: () => dispatch(clientTokenRequest()),
  clientTokenCancelRequest: () => dispatch(clientTokenCancelRequest()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrainTreeAuth);
