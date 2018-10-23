import * as React from 'react';
import { graphql } from 'gatsby';
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

/**
 * This is a SingleProduct Node
 * @param {[type]} props [description]
 */
class Node extends React.Component<Props> {
  /** Safely get header from collection */
  getHeaderImage = (): ImageNode | null => {
    return this.props.data.wordpressWpShop.collections
      ? this.props.data.wordpressWpShop.collections[0].acf.header_image
      : null;
  };

  render() {
    return (
      <Layout headerImage={this.getHeaderImage()}>
        <SingleProduct
          node={this.props.data.wordpressWpShop}
          sizes={this.props.sizes}
        />
      </Layout>
    );
  }
}
const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

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
