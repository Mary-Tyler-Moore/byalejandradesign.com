// @flow
import * as React from 'react';
import Img from 'gatsby-image';
import { BEM } from 'njmyers-component-library';
import { withCart } from '../Cart';
// style
import './single-collection.sass';
// types
import type { CollectionNode } from './types';

type Props = {
  node: CollectionNode,
};

class SingleCollection extends React.Component<Props> {
  render() {
    return (
      <BEM block="singleCollection">
        <section>
          <article key={this.props.node.id}>
            <h2>{this.props.node.name} Collection</h2>
            <h3>{this.props.node.acf.subtitle}</h3>
            <p>{this.props.node.description}</p>
          </article>
        </section>
      </BEM>
    );
  }
}

export default withCart(SingleCollection);
