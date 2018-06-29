import * as React from 'react';
import { graphql } from 'gatsby';

import { CollectionList } from '../../components/Collections';
import Layout from '../../components/Layout';

const Edges = (props) => (
  <Layout>
    <CollectionList edges={props.data.allWordpressWpCollections.edges} />
  </Layout>
);

export default Edges;

export const query = graphql`
  query AllCollectionsOr {
    allWordpressWpCollections {
      edges {
        node {
          ...CollectionData
        }
      }
    }
  }
`;
