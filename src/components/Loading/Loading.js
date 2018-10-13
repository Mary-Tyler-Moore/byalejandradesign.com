import * as React from 'react';
import { Modal } from '@njmyers/component-library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loading extends React.Component {
  state = {
    status: 'off',
  };

  componentDidMount() {
    this.setState({ status: 'on' });
  }

  componentWillUnmount() {
    this.setState({ status: 'off' });
  }

  render() {
    return (
      <Modal status={this.props.status || this.state.status} zIndexOn="1">
        <FontAwesomeIcon icon="spinner" pulse size="4x" />
      </Modal>
    );
  }
}

export default Loading;
