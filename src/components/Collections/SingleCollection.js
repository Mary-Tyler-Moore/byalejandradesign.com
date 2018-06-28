// @flow
import * as React from 'react';
import { withCart } from '../Cart';
// types
import type { ProductNode } from '../Product/types';
import type { CollectionNode } from './types';

export class SingleCollection extends React.Component {
  render() {
    return null;
  }
}

export default withCart(SingleCollection);
