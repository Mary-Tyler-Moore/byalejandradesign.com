import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Button from '../Button';
import FluidImage from '../FluidImage';
// styles
import './collection-excerpt.sass';

/** renders a collection excerpt */
const CollectionExcerpt = ({ node }) => (
  <article className="collectionExcerpt_article">
    <h4 className="collectionExcerpt_h4">{node.name}</h4>
    <FluidImage
      localFile={node.acf.image.localFile}
      to={`/shop/collection/${node.slug}`}
    />
    <p className="collectionExcerpt_description">{node.description}</p>
    <Link
      className="collectionExcerpt_buttonLink"
      to={`/shop/collection/${node.slug}`}
    >
      <Button fullWidth margin>
        View Collection
      </Button>
    </Link>
  </article>
);

export const query = graphql`
  fragment CollectionExcerptFragment on wordpress__wp_collections {
    name
    id
    wordpress_id
    description
    slug
    acf {
      image {
        ...FluidImageFragment
      }
    }
  }
`;

export default CollectionExcerpt;
