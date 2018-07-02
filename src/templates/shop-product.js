// @flow
import * as React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/Layout';
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
  <Layout>
    <SingleProduct node={data.wordpressWpShop} sizes={sizes} />
  </Layout>
);

const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

/**
 * Default image sharp fragment for wp media
 * @type {wordpress__wp_media}
 */
export const sharpImageFragment = graphql`
  fragment SharpImage on wordpress__wp_media {
    localFile {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const sparseFragment = graphql`
  fragment SparseProductData on wordpress__wp_shop {
    title
    slug
    id
  }
`;

/**
 * Shop Product fragment. All product data for a full detailed entry.
 * @type {wordpress__wp_shop}
 */
export const fragment = graphql`
  fragment ProductData on wordpress__wp_shop {
    ...SparseProductData
    collections {
      ...CollectionData
    }
    sizes {
      slug
    }
    ceramics {
      slug
    }
    acf {
      display_title
      quantity
      price
      sale_price
      description
      provided_dimensions
      video_type
      main_image {
        ...SharpImage
      }
      additional_images {
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
