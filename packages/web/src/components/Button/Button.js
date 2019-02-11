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
    return {
      width: this.props.fullWidth ? '100%' : 'inherit',
      margin: this.props.margin ? '1rem 0' : '0',
    };
  }

  render() {
    return (
      <button style={this.style} {...this.props}>
        <span className="button_text-sourceSans" {...this.props.span}>
          {this.props.children}
        </span>
      </button>
    );
  }
}

export default Button;
