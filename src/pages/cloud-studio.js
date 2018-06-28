import * as React from 'react';
import withSize from 'react-size-components';
import { AllPosts } from '../components/CloudStudio';

const Edges = (props) => (
  <section>
    <h1>Cloud Studio</h1>
    <AllPosts edges={props.data.allWordpressPost.edges} />
  </section>
);

const SizedEdges = withSize({ mobile: true })(Edges);

export default SizedEdges;

export const fragment = graphql`
  fragment PostSample on wordpressPost {
    id
    slug
    date
    title
    content
  }
`;

export const query = graphql`
  query AllBlogPosts {
    allWordpressPost {
      edges {
        node {
          ...PostSample
        }
      }
    }
  }
`;
