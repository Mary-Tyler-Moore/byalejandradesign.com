/** @flow */
import { graphql } from 'gatsby';

export type SparsePostData = {
  id: string,
  slug: string,
  title: string,
};

var sparsePostData = graphql`
  fragment SparsePostData on wordpress__POST {
    id
    slug
    title
  }
`;
//
// export type PostData = {
//   date: string,
//   content: string,
// } & SparsePostData;
//
// var postData = graphql`
//   fragment PostData on wordpress__POST {
//     ...SparsePostData
//     date
//     content
//   }
// `;
//
// export type PostNode = {};
//
// var postQuery = graphql`
//   query BlogPostById($id: String!) {
//     wordpressPost(id: { eq: $id }) {
//       ...PostData
//     }
//   }
// `;
//
export { sparsePostData }; //, postData, postQuery };
