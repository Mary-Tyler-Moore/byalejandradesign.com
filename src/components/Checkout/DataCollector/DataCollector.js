/** @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import dataCollector from 'braintree-web/data-collector';
// actions
import { saveData, saveTeardown, saveError } from './data-collector-actions';
// components
import { StatusSwitch } from '@njmyers/component-library';
import ErrorMessage from '../../ErrorMessage';
import Loading from '../../Loading';
// types
import { State as ReducerState } from './data-collector-reducer';

type Props = {
  saveError: () => null,
  saveTeardown: () => null,
  saveData: () => null,
  braintreeClient: {},
  dataCollector: ReducerState,
  children?: React.Node,
};

type State = {
  status: 'initial' | 'loading' | 'error' | 'resolved',
};

/** Initialize Data Collector */
class DataCollector extends React.PureComponent<Props, State> {
  state = {
    status: 'initial',
  };

  options = {
    paypal: true,
  };

  onInstance = (dataCollectorInstance) => {
    this.props.saveTeardown(dataCollectorInstance.teardown);
    this.props.saveData(dataCollectorInstance.deviceData);
    // set state after saving instances please
    this.setState({ status: 'resolved' });
  };

  onError = (error) => {
    if (error) {
      this.setState({ status: 'error' });
      this.props.saveError(error);
    }
  };

  initDataCollector = () => {
    dataCollector
      .create({
        client: this.props.braintreeClient,
        ...this.options,
      })
      .then(this.onInstance)
      .catch(this.onError);
  };

  componentDidMount() {
    this.setState({ status: 'loading' });
    this.initDataCollector();
  }

  componentWillUnmount() {
    if (this.props.dataCollector.teardown) {
      this.props.dataCollector.teardown(this.onError);
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

const mapStateToProps = (state) => ({
  braintreeClient: state.checkout.braintree.client,
  dataCollector: state.checkout.dataCollector,
});

const mapDispatchToProps = (dispatch) => ({
  saveError: (error) => dispatch(saveError(error)),
  saveData: (payload) => dispatch(saveData(payload)),
  saveTeardown: (payload) => dispatch(saveTeardown(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataCollector);
