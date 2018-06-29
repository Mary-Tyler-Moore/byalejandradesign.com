// @flow
import * as React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Button from '../Button';
import './collection-list.sass';

import type { CollectionNode } from './types';

type Props = {
  edges: Array<{ node: CollectionNode }>,
};

/**
 * Renders a list of collections
 */
class CollectionList extends React.Component<Props> {
  render() {
    console.log(this.props.edges);
    return (
      <section className="collectionList">
        {this.props.edges.map(({ node }) => (
          <article key={node.id}>
            <h2>{node.name}</h2>
            <Link to={`/shop/collection/${node.slug}`}>
              <Img sizes={node.acf.image.localFile.childImageSharp.sizes} />
            </Link>
            <h3>{node.acf.subtitle}</h3>
            <p>{node.description}</p>
            <Link to={`/shop/collection/${node.slug}`}>
              <Button>View Collection</Button>
            </Link>
          </article>
        ))}
      </section>
    );
  }
}

export default CollectionList;
