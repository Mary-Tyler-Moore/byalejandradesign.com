
import * as React from 'react';
import { connect } from 'react-redux';
import dataCollector from 'braintree-web/data-collector';
// actions
import { deviceData, saveCollector, braintreeError } from './braintree-actions';

type Props = {
  braintreeError: () => null,
  saveCollector: () => null,
  deviceData: () => null,
  children?: React.Node,
};

/** Initialize Data Collector */
class DataCollector extends React.PureComponent<Props> {
  componentDidMount() {
    Promise.resolve(
      dataCollector.create({ client: this.props.client, paypal: true })
    )
      .then((dataCollectorInstance) => {
        this.props.saveCollector(dataCollectorInstance);
        this.props.deviceData(dataCollectorInstance.deviceData);
      })
      .catch((err) => {
        this.props.braintreeError(err);
      });
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state) => ({
  client: state.checkout.braintree.client,
});

const mapDispatchToProps = (dispatch) => ({
  braintreeError: (error) => dispatch(braintreeError(error)),
  deviceData: (payload) => dispatch(deviceData(payload)),
  saveCollector: (payload) => dispatch(saveCollector(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataCollector);
