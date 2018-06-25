import * as React from 'react';
import './button.sass';

class Button extends React.Component {
  static defaultProps = {
    className: 'defaultButton',
  };

  render() {
    return (
      <button
        onClick={this.props.onClick}
        name={this.props.name}
        className={this.props.className}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;