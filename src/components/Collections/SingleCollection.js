// @flow
import * as React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { ProductList } from '../Product';
import Button from '../Button';
import { withCart } from '../Cart';
// types
import type { CollectionNode } from './types';

type Props = {
  node: CollectionNode,
};

class SingleCollection extends React.Component<Props> {
  render() {
    return (
      <section>
        <article key={this.props.node.id}>
          <h2>{this.props.node.name} Collection</h2>
          <Img
            sizes={this.props.node.acf.image.localFile.childImageSharp.sizes}
          />
          <h3>{this.props.node.acf.subtitle}</h3>
          <p>{this.props.node.description}</p>
        </article>
      </section>
    );
  }
}

export default withCart(SingleCollection);
