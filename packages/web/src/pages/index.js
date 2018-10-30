import React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import Layout from '../components/Layout';

const IndexPage = ({ data }) => (
  <Layout allWordpressAcfOptions={data.allWordpressAcfOptions}>
    <h3 className="h3-amiri">CloudStudio</h3>
    <section>
      {data.allWordpressPost.edges.map(({ node }) => (
        <PostExcerpt key={node.id} node={node} />
      ))}
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
          ...PostExcerptFragment
        }
      }
    }
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionExcerptFragment
        }
      }
    }
  }
`;
