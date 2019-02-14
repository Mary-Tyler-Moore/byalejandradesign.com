import * as React from 'react';
import { graphql } from 'gatsby';
import FluidImage from '../FluidImage';
// styles
import './collection-excerpt.sass';

/** renders a collection excerpt */
const CollectionExcerpt = ({ node }) => (
  <article className="collectionExcerpt">
    <h4 className="collectionExcerpt_h4">{node.name}</h4>
    <FluidImage
      localFile={node.acf.image.localFile}
      to={`/shop/collection/${node.slug}`}
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
