import * as React from 'react';
import { graphql } from 'gatsby';
import FluidImage from '../FluidImage';

const CollectionExcerpt = ({ node }) => (
  <article style={{ width: '100%' }}>
    <h5 className="headline" style={{ margin: 0 }}>
      {node.name}
    </h5>
    <FluidImage
      localFile={node.acf.image.localFile}
      to={`/shop/collection/${node.slug}`}
      style={{ marginTop: '1rem' }}
    />
  </article>
);

export const query = graphql`
  fragment CollectionExcerptFragment on wordpress__wp_collections {
    name
    id
    wordpress_id
    slug
    acf {
      order
      image {
        ...FluidImageFragment
      }
    }
  }
`;

export default CollectionExcerpt;
