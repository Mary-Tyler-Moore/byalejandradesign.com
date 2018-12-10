import * as React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import { SinglePost } from '../components/CloudStudio';

const PostPage = ({ data, location }) => (
  <Layout location={location} title={data.wordpressPost.title}>
    <Helmet>
      <meta property="og:type" content="article" />
    </Helmet>
    <SinglePost node={data.wordpressPost} />
  </Layout>
);

export default PostPage;

export const query = graphql`
  query BlogPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      ...SinglePostFragment
    }
  }
`;
