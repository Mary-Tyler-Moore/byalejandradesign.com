/** @flow */
import * as React from 'react';
import withSize from 'react-size-components';
// types
import type { Props, State } from './types';
// styles
import './iframe.sass';

const Iframe = ({ sizes, childRef, ratio, ...props }) => (
  <iframe
    ref={childRef}
    className="iframe"
    height={sizes.component.width / ratio}
    {...props}
  />
);

Iframe.defaultProps = {
  ratio: 16 / 9,
};

export default withSize({ component: true })(Iframe);
