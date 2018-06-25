import * as React from 'react';
import withSize from 'react-size-components';
import { SinglePostMobile, SinglePostDesktop } from '../components/CloudStudio';

const Node = (props) =>
  props.sizes.mobile ? (
    <SinglePostMobile node={props.data.wordpressPost} />
  ) : (
    <SinglePostDesktop node={props.data.wordpressPost} />
  );

const SizedNode = withSize({ mobile: true })(Node);

export default SizedNode;

export const query = graphql`
  query BlogPostById($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      slug
      date
      title
      content
    }
  }
`;
