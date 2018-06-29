// @flow
import * as React from 'react';
import { Link } from 'gatsby';
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
    return (
      <section className="collectionList">
        {this.props.edges.map(({ node }) => (
          <article key={node.id}>
            <h2>{node.name}</h2>
            <Link to={`/shop/collection/${node.slug}`}>
              <Img fluid={node.acf.image.localFile.childImageSharp.fluid} />
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
