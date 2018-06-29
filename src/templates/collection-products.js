import * as React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { SingleCollection } from '../components/Collections';
import { ProductList } from '../components/Product';

const CollectionProducts = ({ data }) => (
  <Layout>
    <SingleCollection node={data.wordpressWpCollections} />
    {data.allWordpressWpShop && (
      <ProductList edges={data.allWordpressWpShop.edges} />
    )}
  </Layout>
);

export default CollectionProducts;

export const sparseFragment = graphql`
  fragment SparseCollectionData on wordpress__wp_collections {
    name
    id
    description
    slug
    acf {
      subtitle
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
            fluid(maxWidth: 1200, maxHeight: 800) {
              ...GatsbyImageSharpFluid
            }
          }
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
