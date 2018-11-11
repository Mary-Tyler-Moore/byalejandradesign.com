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

export const query = graphql`
  query CollectionById($id: String!) {
    wordpressWpCollections(id: { eq: $id }) {
      ...SingleCollectionFragment
      acf {
        header_image {
          localFile {
            ...HeaderImageFragment
          }
        }
      }
    }
    allWordpressWpShop(
      filter: { collections: { elemMatch: { id: { eq: $id } } } }
    ) {
      edges {
        node {
          ...ProductData
        }
      }
    }
  }
`;
