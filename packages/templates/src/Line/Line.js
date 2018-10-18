import * as React from 'react';
import { camelToTitle } from 'smalldash';

const Line = ({ label, children }) =>
  label && children ? (
    <p className="body-sourceSans-2">
      <strong>{camelToTitle(label)}: </strong>
      {children}
    </p>
  ) : null;

export default Line;
