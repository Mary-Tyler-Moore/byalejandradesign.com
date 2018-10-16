import React from 'react';
import { graphql } from 'gatsby';
import { AllPosts } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import Layout from '../components/Layout';

const IndexPage = ({ data }) => (
  <Layout allWordpressAcfOptions={data.allWordpressAcfOptions}>
    <section>
      <AllPosts edges={data.allWordpressPost.edges} />
      <CollectionList edges={data.allWordpressWpCollections.edges} />
    </section>
  </Layout>
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
