import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { SinglePost } from '../components/CloudStudio';

const PostPage = (props) => (
  <Layout>
    <SinglePost node={props.data.wordpressPost} />
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
