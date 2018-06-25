// @flow
import * as React from 'react';
import { connect } from 'react-redux';
// actions
import { dataCollector } from './braintree-actions';

type ReduxProps = {
  dataCollector: Function,
  children?: React.Node,
};

/** Initialize Data Collector */
class DataCollector extends React.PureComponent<ReduxProps> {
  componentWillMount() {
    this.props.dataCollector();
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  dataCollector: () => dispatch(dataCollector()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataCollector);
