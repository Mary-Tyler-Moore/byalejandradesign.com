import * as React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import Layout from '../components/Layout';

import './cloud-studio.sass';

const CloudStudio = ({ data }) => (
  <Layout>
    <h3 className="h3-amiri">Cloud Studio</h3>
    <section className="postList">
      {data.allWordpressPost.edges.map(({ node }) => (
        <PostExcerpt key={node.id} node={node} />
      ))}
    </section>
  </Layout>
);

export default CloudStudio;

export const query = graphql`
  query AllBlogPosts {
    allWordpressPost {
      edges {
        node {
          ...PostExcerptFragment
        }
      }
    }
  }
`;
