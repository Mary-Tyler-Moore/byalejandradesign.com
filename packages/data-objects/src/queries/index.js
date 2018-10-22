/** @flow */
import { graphql } from './graphql';

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
