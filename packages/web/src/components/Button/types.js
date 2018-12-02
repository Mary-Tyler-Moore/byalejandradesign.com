/** @flow */
import * as React from 'react';

export type Props = {
  children?: React.Node,
  type: 'submit' | 'reset' | 'button',
  className: string,
  name: string,
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => any,
  margin: boolean,
  fullWidth: boolean,
};
