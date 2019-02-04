import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { SinglePost } from '../components/CloudStudio';

const PostPage = ({ data, location }) => (
  <React.Fragment>
    <Head location={location} title={data.wordpressPost.title} />
    <Layout>
      <Helmet>
        <meta property="og:type" content="article" />
      </Helmet>
      <SinglePost node={data.wordpressPost} />
    </Layout>
  </React.Fragment>
);

export default PostPage;

export const query = graphql`
  query BlogPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      ...SinglePostFragment
    }
  }
`;
