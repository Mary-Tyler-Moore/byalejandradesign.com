import React, { PureComponent } from 'react';

class Input extends PureComponent {
    static defaultProps = {
        type: 'text',
        name: 'input',
        required: false,
        className: 'formInput',
        focus: false,
    };

    constructor(props) {
        super(props);
        this.label = this.props.label ? this.props.label : this.props.name;
    }

    componentDidMount() {
        if (this.props.focus) this.input.focus();
    }

    render() {
        return (
            <div
                className={`${this.props.className} ${
                    this.props.modifier ? this.props.modifier : ''
                }`}
            >
                <label className={`${this.props.className}_label`} htmlFor={this.props.name}>
                    {this.label}
                </label>
                <input
                    ref={(node) => (this.input = node)}
                    className={`${this.props.className}_input`}
                    type={this.props.type}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    required={this.props.required}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}

export default Input;
