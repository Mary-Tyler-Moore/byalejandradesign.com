/** @flow */
import * as React from 'react';
import { graphql } from 'gatsby';
// import { withCart } from '../Cart';
// style
import './single-collection.sass';
// types
import type { CollectionNode } from '@byalejandradesign/data-objects';

type Props = {
  node: CollectionNode,
};

const SingleCollection = ({ node }: Props) => (
  <section className="singleCollection">
    <article className="singleCollection_article" key={node.id}>
      <h2 className="singleCollection_h2">{node.name}</h2>
      <p className="singleCollection_description">
        <em>{node.description}</em>
      </p>
    </article>
  </section>
);

export const query = graphql`
  fragment SingleCollectionFragment on wordpress__wp_collections {
    name
    id
    wordpress_id
    description
  }
`;

export default SingleCollection;
