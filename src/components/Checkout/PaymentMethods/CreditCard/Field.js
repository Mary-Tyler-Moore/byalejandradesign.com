
import React from 'react';
import { camelToKebab, camelToTitle } from 'smalldash';
import { BEM } from '@njmyers/component-library';

import type { FieldState } from './HostedFields';

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
  state: FieldState,
};

const Field = ({ type, state }: Props) => (
  <BEM block="hostedField">
    <div modifiers={type}>
      <label element="label" htmlFor={camelToKebab(type)}>
        {type !== 'cvv' ? camelToTitle(type) : type.toUpperCase()}
      </label>
      <div
        element="inputContainer"
        modifiers={fieldStateClasses(state)}
        id={camelToKebab(type)}
      />
    </div>
  </BEM>
);

export default Field;
