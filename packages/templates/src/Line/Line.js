/** @flow */
import * as React from 'react';
import { camelToTitle } from 'smalldash';

export type Props = {
  label: string,
  children?: React.Node,
};

const Line = ({ label, children }: Props) =>
  label && children ? (
    <p className="body-sourceSans-2">
      <strong>{camelToTitle(label)}: </strong>
      {children}
    </p>
  ) : null;

export default Line;
