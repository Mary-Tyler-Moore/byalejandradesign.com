// @flow
import * as React from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

type Props = {
  spinner: React.ComponentType<{}>,
  error: React.ComponentType<{}>,
  status: string,
  children?: React.Node,
};

class StatusSwitch extends React.Component<Props> {
  static defaultProps = {
    error: ErrorMessage,
    spinner: Spinner,
    status: 'initial',
  };

  cascadeStatus = (status: string | Array<string>) => {
    if (!Array.isArray(status)) return status;
    else if (status.includes('error')) return 'error';
    else if (status.includes('loading')) return 'loading';
    else if (status.includes('resolved')) return 'resolved';
  };

  render() {
    switch (this.cascadeStatus(this.props.status)) {
      case 'loading':
        const Spinner: React.ComponentType<{}> = this.props.spinner;
        return <Spinner />;
      case 'error':
        const Error: React.ComponentType<{}> = this.props.error;
        return <Error />;
      case 'resolved':
      case 'initial':
      default:
        return this.props.children;
    }
  }
}

export default StatusSwitch;