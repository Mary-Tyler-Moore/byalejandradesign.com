import * as React from 'react';
import { graphql } from 'gatsby';
import { PostExcerpt } from '../components/CloudStudio';
import Layout from '../components/Layout';
import Head from '../components/Head';

import './cloud-studio.sass';

const CloudStudio = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} title="Cloud Studio" />
    <Layout>
      <h4 className="headline" style={{ margin: 0 }}>
        Cloud Studio
      </h4>
      <section className="postList">
        {data.allWordpressPost.edges.map(({ node }) => (
          <PostExcerpt key={node.id} node={node} />
        ))}
      </section>
    </Layout>
  </React.Fragment>
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
