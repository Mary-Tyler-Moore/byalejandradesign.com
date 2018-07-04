
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children?: React.Node,
};

type State = {
  PaypalButton: React.ComponentType<any> | null,
};

const withPaypalButton = (Wrapped: React.ComponentType<any>) => {
  /**
   * Safely loads the paypal driver so that we can use SSR with paypal checkout
   */
  return class PaypalDriverLoader extends React.PureComponent<Props, State> {
    state = {
      PaypalButton: null,
    };

    /**
     * Load module and pass to component
     * @return {[type]} [description]
     */
    componentDidMount() {
      import('paypal-checkout').then((module) => {
        this.setState((state) => {
          return !state.PaypalButton
            ? {
                PaypalButton: module.Button.driver('react', {
                  React,
                  ReactDOM,
                }),
              }
            : null;
        });
      });
    }

    render() {
      return <Wrapped {...this.props} PaypalButton={this.state.PaypalButton} />;
    }
  };
};

export default withPaypalButton;
