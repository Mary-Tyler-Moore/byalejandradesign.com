import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import withSize from 'react-size-components';
import { SingleProduct } from '../components/Product';
// types
import type { ProductNode, ImageNode } from '../components/Product/types';

type Props = {
  data: {
    wordpressWpShop: ProductNode,
  },
  sizes: {
    mobile: boolean,
  },
};

const getHeaderImage = (data): ImageNode | null => {
  return data.wordpressWpShop.collections
    ? data.wordpressWpShop.collections[0].acf.header_image
    : null;
};

/**
 * ingleProduct Node
 * @param {[type]} props [description]
 */
const ShopProduct = ({ location, data, sizes }) => (
  <Layout
    location={location}
    title={
      data.wordpressWpShop.acf.display_title || data.wordpressWpShop.acf.title
    }
    description={data.wordpressWpShop.description}
    headerImage={getHeaderImage(data)}
  >
    <Helmet>
      <html itemscope itemtype="http://schema.org/Product" />
      <meta property="og:type" content="article" />
      <meta
        property="og:price:amount"
        content={data.wordpressWpShop.acf.price}
      />
      <meta property="og:price:currency" content="USD" />
    </Helmet>
    <SingleProduct node={data.wordpressWpShop} sizes={sizes} />
  </Layout>
);

export default withSize({ mobile: true })(ShopProduct);

export const sparseFragment = graphql`
  fragment SparseProductData on wordpress__wp_shop {
    title
    slug
    id
    wordpress_id
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
      slug
      acf {
        header_image {
          localFile {
            publicURL
            ...HeaderImageFragment
          }
        }
      }
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
      dimensions {
        length
        width
        height
      }
      main_image {
        ...FluidImageFragment
      }
      additional_images {
        ...FluidImageFragment
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
