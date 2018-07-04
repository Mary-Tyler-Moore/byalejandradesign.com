import * as React from 'react';
// import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { SingleCollection } from '../components/Collections';
import { ProductList } from '../components/Product';

const CollectionProducts = ({ data }) => (
  <Layout headerImage={data.wordpressWpCollections.acf.header_image}>
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
  }
`;

export const fragement = graphql`
  fragment CollectionData on wordpress__wp_collections {
    ...SparseCollectionData
    acf {
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      header_image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80, cropFocus: NORTH) {
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
