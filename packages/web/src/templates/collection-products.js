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

/** Safely get header image from this collection node */
const getHeaderImage = (data) =>
  data.wordpressWpCollections.acf.header_image
    ? data.wordpressWpCollections.acf.header_image
    : null;

const CollectionProducts = ({ location, data }: Props) => (
  <Layout
    location={location}
    title={data.wordpressWpCollections.name}
    headerImage={getHeaderImage(data)}
  >
    <SingleCollection node={data.wordpressWpCollections} />
    {data.allWordpressWpShop && (
      <ProductList edges={data.allWordpressWpShop.edges} />
    )}
  </Layout>
);

export default CollectionProducts;

export const query = graphql`
  query CollectionById($id: String!) {
    wordpressWpCollections(id: { eq: $id }) {
      ...SingleCollectionFragment
      acf {
        header_image {
          localFile {
            publicURL
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
