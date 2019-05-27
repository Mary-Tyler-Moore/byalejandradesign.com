/** @flow */
import * as React from 'react';
import './button.sass';
// types
import type { Props } from './types';

class Button extends React.Component<Props> {
  static defaultProps = {
    className: 'button-yellow',
    type: 'button',
  };

  get style() {
    const { style } = this.props;

    return {
      ...style,
      width: this.props.fullWidth ? '100%' : 'inherit',
      margin: this.props.margin ? '1rem 0' : '0',
    };
  }

  render() {
    const { span, children, ...props } = this.props;

    return (
      <button style={this.style} {...props}>
        <span {...span}>{children}</span>
      </button>
    );
  }
}

export default Button;
