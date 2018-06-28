import * as React from 'react';
import { CollectionList } from '../components/Collections';

const Edges = (props) => (
  <CollectionList edges={props.data.allWordpressWpCollections.edges} />
);

export default Edges;

export const query = graphql`
  query AllCollections {
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionData
        }
      }
    }
  }
`;
