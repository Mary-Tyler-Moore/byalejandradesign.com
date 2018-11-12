import React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import { CollectionList } from '../components/Collections';
import Layout from '../components/Layout';

import './cloud-studio.sass';

const IndexPage = ({ data }) => (
  <Layout allWordpressAcfOptions={data.allWordpressAcfOptions}>
    <CollectionList edges={data.allWordpressWpCollections.edges} />
    <h3 className="h3-amiri">Cloud Studio</h3>
    <section className="postList">
      {data.allWordpressPost.edges.map(({ node }) => (
        <PostExcerpt key={node.id} node={node} />
      ))}
    </section>
  </Layout>
);

export default IndexPage;

export const query = graphql`
  query HomePageSample {
    allWordpressPost(limit: 3) {
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
