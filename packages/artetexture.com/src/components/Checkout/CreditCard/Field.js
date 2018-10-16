import * as React from 'react';
import { camelToKebab, camelToTitle } from 'smalldash';
// types
import type { FieldState } from './types';
// styles
import './field.sass';

/**
 * Maps the field states to valid css class modifiers
 * @param {state}
 */
const fieldStateClasses = (state: FieldState) => {
  const states = Object.entries(state)
    .filter((entries) => entries[1])
    .map((entries) => entries[0]);

  // manually add isInvalid class
  return !state.isPotentiallyValid ? ['isInvalid', ...states] : states;
};

type Props = {
  type: string,
  fieldState: FieldState,
};

class HostedField extends React.Component<Props> {
  getLabel = () => {
    switch (this.props.type) {
      case 'cvv':
        return 'CVV';
      default:
        return camelToTitle(this.props.type);
    }
  };

  getClassNames = () => {
    const modifiers = fieldStateClasses(this.props.fieldState);

    return `field_input${modifiers.reduce(
      (prevString, modifier) => `${prevString} field_input-${modifier}`,
      ''
    )}`;
  };

  render() {
    return (
      <div className="field">
        <label className="field_label" htmlFor={camelToKebab(this.props.type)}>
          {this.getLabel()}
        </label>
        <div
          className={this.getClassNames()}
          id={camelToKebab(this.props.type)}
        />
      </div>
    );
  }
}

export default HostedField;
