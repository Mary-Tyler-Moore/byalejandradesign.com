import * as React from 'react';
import withSize from 'react-size-components';
import { AllPostsDesktop, AllPostsMobile } from '../components/CloudStudio';

const Edges = (props) =>
  props.sizes.mobile ? (
    <AllPostsMobile edges={props.data.allWordpressPost.edges} />
  ) : (
    <AllPostsDesktop edges={props.data.allWordpressPost.edges} />
  );

const SizedEdges = withSize({ mobile: true })(Edges);

export default SizedEdges;

export const query = graphql`
  query AllBlogPosts {
    allWordpressPost {
      edges {
        node {
          id
          slug
          date
          title
          content
        }
      }
    }
  }
`;
