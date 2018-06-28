import * as React from 'react';

const CollectionProducts = ({ data }) => <p>{JSON.stringify(data)}</p>;

export default CollectionProducts;

export const fragement = graphql`
  fragment CollectionData on wordpress__wp_collections {
    name
    id
    description
    acf {
      subtitle
      image {
        localFile {
          childImageSharp {
            sizes(maxWidth: 800, maxHeight: 600) {
              ...GatsbyImageSharpSizes
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
  }
`;
