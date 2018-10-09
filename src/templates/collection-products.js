import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { SingleCollection } from '../components/Collections';
import { ProductList } from '../components/Product';
// types
import type { CollectionNode } from '../components/Collections/types';
import type { ProductEdges, ImageNode } from '../components/Product/types';

type Props = {
  data: {
    wordpressWpCollections: CollectionNode,
    allWordpressWpShop: ProductEdges,
  },
};

class CollectionProducts extends React.Component<Props> {
  /** Safely get header image from this collection node */
  getHeaderImage = (): ImageNode | null =>
    this.props.data.wordpressWpCollections.acf.header_image
      ? this.props.data.wordpressWpCollections.acf.header_image
      : null;

  render() {
    return (
      <Layout headerImage={this.getHeaderImage()}>
        <SingleCollection node={this.props.data.wordpressWpCollections} />
        {this.props.data.allWordpressWpShop && (
          <ProductList edges={this.props.data.allWordpressWpShop.edges} />
        )}
      </Layout>
    );
  }
}

export default CollectionProducts;

export const sparseFragment = graphql`
  fragment SparseCollectionData on wordpress__wp_collections {
    name
    id
    description
    slug
  }
`;

export const headerFragmet = graphql`
  fragment HeaderImage on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 100, cropFocus: NORTH) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const fragement = graphql`
  fragment CollectionData on wordpress__wp_collections {
    ...SparseCollectionData
    acf {
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      header_image {
        localFile {
          ...HeaderImage
        }
      }
    }
  }
`;

export const query = graphql`
  query CollectionById($id: String!) {
    wordpressWpCollections(id: { eq: $id }) {
      ...CollectionData
    }
    allWordpressWpShop(filter: { collections: { id: { eq: $id } } }) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
