import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { AllPosts } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';

const IndexPage = (props) => (
  <section>
    <h1>New from the Cloud Studio</h1>
    <AllPosts edges={props.data.allWordpressPost.edges} />
    <h1>Collections</h1>
    <CollectionList edges={props.data.allWordpressWpCollections.edges} />
  </section>
);

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
          ...CollectionData
        }
      }
    }
  }
`;
