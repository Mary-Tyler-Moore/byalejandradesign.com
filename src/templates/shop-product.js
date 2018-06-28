// @flow
import * as React from 'react';
import withSize from 'react-size-components';
import { SingleProduct } from '../components/Product';
// types
import type { ProductNode } from '../components/Product/types';

type Props = {
  data: {
    wordpressWpShop: {
      edges: Array<{ node: ProductNode }>,
    },
  },
  sizes: {
    mobile: boolean,
  },
};

/**
 * This is a SingleProduct Node
 * @param {[type]} props [description]
 */
const Node = ({ data, sizes }: Props = {}) => (
  <SingleProduct node={data.wordpressWpShop} sizes={sizes} />
);

const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

/**
 * These are nested data fragments
 * Only available as nested taxonomies on type wordpress__wp_shop
 */
export const sizeNestedFragment = graphql`
  fragment NestedSizeData on size_4 {
    term_id
    name
    slug
  }
`;

export const ceramicNestedFragment = graphql`
  fragment NestedCeramicData on ceramic_4 {
    term_id
    name
    slug
  }
`;

export const collectionNestedFragment = graphql`
  fragment NestedCollectionData on collection_24 {
    term_id
    name
    slug
  }
`;

/**
 * Default image sharp fragment for wp media
 * @type {wordpress__wp_media}
 */
export const sharpImageFragment = graphql`
  fragment SharpImage on wordpress__wp_media {
    localFile {
      childImageSharp {
        sizes(maxWidth: 800, maxHeight: 600) {
          ...GatsbyImageSharpSizes
        }
      }
    }
  }
`;

/**
 * Shop Product fragment. All product data for a full detailed entry.
 * @type {wordpress__wp_shop}
 */
export const fragment = graphql`
  fragment ProductData on wordpress__wp_shop {
    title
    slug
    id
    acf {
      display_title
      quantity
      price
      sale_price
      description
      product_type
      provided_dimensions
      ceramic {
        ...NestedCeramicData
      }
      size {
        ...NestedSizeData
      }
      collection {
        ...NestedCollectionData
      }
      additional_images
      video_type
      main_image {
        ...SharpImage
      }
    }
  }
`;

export const query = graphql`
  query ProductById($id: String!) {
    wordpressWpShop(id: { eq: $id }) {
      ...ProductData
    }
  }
`;
