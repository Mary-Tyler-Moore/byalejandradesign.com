import React from 'react';
import Link from 'gatsby-link';

const IndexPage = (props) => <section>{JSON.stringify(props.data)}</section>;

export default IndexPage;

export const query = graphql`
  query HomePageSample {
    allWordpressPost(limit: 2) {
      edges {
        node {
          ...PostSample
        }
      }
    }
    allWordpressWpCollections {
      edges {
        node {
          id
        }
      }
    }
  }
`;
