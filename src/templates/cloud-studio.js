import * as React from 'react';
// import { graphql } from 'gatsby';
import withSize from 'react-size-components';
import Layout from '../components/Layout';
import { SinglePostMobile, SinglePostDesktop } from '../components/CloudStudio';

const Node = (props) => (
  <Layout>
    {props.sizes.mobile ? (
      <SinglePostMobile node={props.data.wordpressPost} />
    ) : (
      <SinglePostDesktop node={props.data.wordpressPost} />
    )}
  </Layout>
);

const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

export const sparseFragment = graphql`
  fragment SparsePostData on wordpress__POST {
    id
    slug
    title
  }
`;

export const fragment = graphql`
  fragment PostData on wordpress__POST {
    ...SparsePostData
    date
    content
  }
`;

export const query = graphql`
  query BlogPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      ...PostData
    }
  }
`;
