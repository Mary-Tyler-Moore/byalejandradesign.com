import * as React from 'react';
import { graphql } from 'gatsby';

import withSize from 'react-size-components';
import { AllPosts } from '../components/CloudStudio';
import Layout from '../components/Layout';

const Edges = (props) => (
  <Layout>
    <section>
      <h1>Cloud Studio</h1>
      <AllPosts edges={props.data.allWordpressPost.edges} />
    </section>
  </Layout>
);

const SizedEdges = withSize({ mobile: true })(Edges);

export default SizedEdges;

export const query = graphql`
  query AllBlogPosts {
    allWordpressPost {
      edges {
        node {
          ...PostData
        }
      }
    }
  }
`;
