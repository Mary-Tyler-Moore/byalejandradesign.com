import * as React from 'react';
import './button.sass';

class Button extends React.Component {
  static defaultProps = {
    className: 'button-yellow',
  };

  render() {
    return (
      <button
        onClick={this.props.onClick}
        name={this.props.name}
        className={this.props.className}
        style={{
          width: this.props.fullWidth ? '100%' : 'inherit',
          margin: this.props.margin ? '1rem 0' : '0',
        }}
      >
        <span className="button_text-sourceSans">{this.props.children}</span>
      </button>
    );
  }
}

export default Button;
