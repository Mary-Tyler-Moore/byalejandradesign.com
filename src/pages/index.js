import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { AllPosts } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';

const IndexPage = ({ data }) => (
  <section>
    <h1>New from the Cloud Studio</h1>
    <AllPosts edges={data.allWordpressPost.edges} />
    <h1>Collections</h1>
    <CollectionList edges={data.allWordpressWpCollections.edges} />
  </section>
);

export default IndexPage;

export const query = graphql`
  query HomePageSample {
    allWordpressPost(limit: 2) {
      edges {
        node {
          ...PostData
        }
      }
    }
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionData
        }
      }
    }
  }
`;
